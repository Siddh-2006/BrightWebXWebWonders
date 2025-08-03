// utils/geminiApiManager.js
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// --- Configuration ---
// Load API keys from multiple sources
const loadApiKeys = () => {
    const keys = [];
    
    // Primary keys
    if (process.env.GEMINI_API_KEY_AI_GURU) {
        keys.push(process.env.GEMINI_API_KEY_AI_GURU.trim());
    }
    
    if (process.env.GEMINI_API_KEY_TrainingPlan) {
        keys.push(process.env.GEMINI_API_KEY_TrainingPlan.trim());
    }
    
    if (process.env.GEMINI_API_KEY_PostureCorrector) {
        keys.push(process.env.GEMINI_API_KEY_PostureCorrector.trim());
    }

    // Additional keys from comma-separated list
    if (process.env.GEMINI_API_KEYS) {
        const additionalKeys = process.env.GEMINI_API_KEYS.split(',');
        additionalKeys.forEach(key => {
            const trimmedKey = key.trim();
            if (trimmedKey && !keys.includes(trimmedKey)) {
                keys.push(trimmedKey);
            }
        });
    }

    return keys.filter(key => key && key.length > 20); // Basic validation
};

const API_KEYS = loadApiKeys();
const RPM_LIMIT_PER_KEY = 10; // Requests Per Minute (Google's default free tier is often 60 RPM per project)
const RPD_LIMIT_PER_KEY = 250; // Requests Per Day (Google's default free tier is often 1500 RPD per project)
const SAFETY_THRESHOLD_PERCENT = 0.8; // Use only 80% of quota to be safe

const MAX_RPM_CALLS = Math.floor(RPM_LIMIT_PER_KEY * SAFETY_THRESHOLD_PERCENT);
const MAX_RPD_CALLS = Math.floor(RPD_LIMIT_PER_KEY * SAFETY_THRESHOLD_PERCENT);

const RPM_WINDOW_MS = 60 * 1000; // 1 minute
const TEMP_DISABLE_TIME_MS = 5 * 60 * 1000; // 5 minutes disable on 429 error

const API_KEY_STATE_FILE = path.join(__dirname, 'apiKeyState.json');

// --- State Management ---
let apiKeyState = {}; // In-memory state of API key usage

function initializeKeyState(key) {
    return {
        requestsToday: 0,
        lastResetDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        lastMinuteCalls: [], // Array of timestamps for calls in the last minute
        disabledUntil: 0, // Timestamp when key can be re-enabled
        lastGenerationRun: 0, // Timestamp of the last time this key was successfully used for question generation
    };
}

function loadApiKeyState() {
    try {
        let loadedState = {};
        if (fs.existsSync(API_KEY_STATE_FILE)) {
            const data = fs.readFileSync(API_KEY_STATE_FILE, 'utf8');
            loadedState = JSON.parse(data);
        }

        const today = new Date().toISOString().split('T')[0];
        apiKeyState = {}; // Reset in-memory state, will be populated from loadedState or initialized

        API_KEYS.forEach(key => {
            // Check if state exists for key and it's for today's date
            if (loadedState[key] && loadedState[key].lastResetDate === today) {
                apiKeyState[key] = loadedState[key];
            } else {
                // Initialize new keys or reset daily counters for old keys if it's a new day
                apiKeyState[key] = initializeKeyState(key);
            }
        });

        console.log('[API Manager] API key state loaded and synced.');
        saveApiKeyState(); // Save to persist any initializations/resets
    } catch (error) {
        console.error('[API Manager] Error loading API key state (starting fresh):', error.message);
        // Fallback: if file corrupted or error, initialize all keys from scratch
        API_KEYS.forEach(key => {
            apiKeyState[key] = initializeKeyState(key);
        });
    }
}

function saveApiKeyState() {
    try {
        fs.writeFileSync(API_KEY_STATE_FILE, JSON.stringify(apiKeyState, null, 2));
    } catch (error) {
        console.error('[API Manager] Error saving API key state:', error.message);
    }
}

// --- Core Logic ---

function getAvailableApiKey() {
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];

    // Prune old timestamps from lastMinuteCalls and reset daily counters if it's a new day
    for (const key in apiKeyState) {
        const state = apiKeyState[key];
        if (state.lastResetDate !== today) {
            state.requestsToday = 0;
            state.lastResetDate = today;
            // Also reset lastMinuteCalls and disabledUntil for a fresh start on a new day
            state.lastMinuteCalls = [];
            state.disabledUntil = 0;
        }
        state.lastMinuteCalls = state.lastMinuteCalls.filter(ts => now - ts < RPM_WINDOW_MS);
    }

    // Filter and sort available keys
    const availableKeys = API_KEYS.map(key => ({ key, state: apiKeyState[key] }))
        .filter(({ state }) =>
            state.disabledUntil <= now && // Key is not temporarily disabled
            state.requestsToday < MAX_RPD_CALLS && // Daily quota not exceeded
            state.lastMinuteCalls.length < MAX_RPM_CALLS // Minute quota not exceeded
        )
        .sort((a, b) => a.state.lastMinuteCalls.length - b.state.lastMinuteCalls.length); // Prefer keys with fewer recent calls

    if (availableKeys.length > 0) {
        return availableKeys[0].key;
    }

    return null; // No key is currently available
}

function recordApiCall(apiKey) {
    if (!apiKeyState[apiKey]) {
        // If key not in state (e.g., new key added but state not reloaded), initialize it
        apiKeyState[apiKey] = initializeKeyState(apiKey);
    }

    const now = Date.now();
    apiKeyState[apiKey].requestsToday++;
    apiKeyState[apiKey].lastMinuteCalls.push(now);
    apiKeyState[apiKey].lastGenerationRun = now; // Update the last time this key was used for content generation

    console.log(`[API Manager] Call recorded for key ${apiKey.substring(0, 5)}... RPM: ${apiKeyState[apiKey].lastMinuteCalls.length}/${MAX_RPM_CALLS}, RPD: ${apiKeyState[apiKey].requestsToday}/${MAX_RPD_CALLS}`);
    saveApiKeyState();
}

function disableKeyTemporarily(apiKey) {
    if (!apiKeyState[apiKey]) return;

    const disabledUntil = Date.now() + TEMP_DISABLE_TIME_MS;
    apiKeyState[apiKey].disabledUntil = disabledUntil;
    console.warn(`[API Manager] Key ${apiKey.substring(0, 5)}... temporarily disabled until ${new Date(disabledUntil).toLocaleTimeString()} IST.`); // Adjusted for IST
    saveApiKeyState();
}

function resetDailyKeyUsage() {
    console.log(`[API Manager] Performing explicit daily API key usage reset at ${new Date().toLocaleTimeString()} IST.`);
    const today = new Date().toISOString().split('T')[0];
    API_KEYS.forEach(key => {
        apiKeyState[key] = initializeKeyState(key); // Re-initialize each key
        apiKeyState[key].lastResetDate = today; // Ensure it's marked for today
    });
    saveApiKeyState();
    console.log('[API Manager] All key usages have been reset for the new day.');
}

// Function to get the latest generation timestamp across all keys
function getLastGenerationTimestamp() {
    let latestTimestamp = 0;
    for (const key in apiKeyState) {
        if (apiKeyState[key].lastGenerationRun > latestTimestamp) {
            latestTimestamp = apiKeyState[key].lastGenerationRun;
        }
    }
    return latestTimestamp;
}

// Initial load of API key state when module is loaded
loadApiKeyState();

module.exports = {
    getAvailableApiKey,
    recordApiCall,
    disableKeyTemporarily,
    resetDailyKeyUsage,
    getLastGenerationTimestamp, // Export this for the cron job logic
    // Export constants for visibility if needed elsewhere
    RPM_WINDOW_MS,
    // Export additional utilities for monitoring
    getApiKeyState: () => apiKeyState,
    getApiKeys: () => API_KEYS,
    getQuotaLimits: () => ({
        RPM_LIMIT_PER_KEY,
        RPD_LIMIT_PER_KEY,
        MAX_RPM_CALLS,
        MAX_RPD_CALLS,
        SAFETY_THRESHOLD_PERCENT
    })
};