// utils/geminiApiManager.js
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const path = require('path');

const GEMINI_API_KEYS = process.env.GEMINI_API_KEYS ? process.env.GEMINI_API_KEYS.split(',') : [];
const GEMINI_PRO_DAILY_TOKEN_LIMIT_PER_KEY = 250000; // 250 RPD * 1000 tokens/request (adjust based on average prompt/response size)
const MAX_RPM_CALLS_PER_KEY = 10; // Gemini 1.5 Pro RPM limit
const RPM_WINDOW_MS = 60 * 1000; // 1 minute in milliseconds
const TEMP_DISABLE_TIME_MS = 5 * 60 * 1000; // 5 minutes for temporary disable after a 429 error

const API_KEY_STATE_FILE = path.join(__dirname, 'apiKeyState.json');

// Structure for apiKeyState:
// {
//   "YOUR_API_KEY_1": {
//     tokensUsedToday: 0,
//     lastUsedDate: "YYYY-MM-DD",
//     lastMinuteCalls: [], // Array of timestamps for calls in the last minute
//     disabledUntil: 0     // Timestamp until which the key is temporarily disabled
//   },
//   ...
// }
let apiKeyState = {};

// --- Persistence Functions ---
function loadApiKeyState() {
    try {
        if (fs.existsSync(API_KEY_STATE_FILE)) {
            const data = fs.readFileSync(API_KEY_STATE_FILE, 'utf8');
            const loadedState = JSON.parse(data);
            // Merge loaded state with current keys, ensuring new keys are initialized
            // and old keys are cleaned up if dotenv changes.
            const newState = {};
            GEMINI_API_KEYS.forEach(key => {
                newState[key] = {
                    tokensUsedToday: loadedState[key]?.tokensUsedToday || 0,
                    lastUsedDate: loadedState[key]?.lastUsedDate || new Date().toISOString().split('T')[0],
                    lastMinuteCalls: loadedState[key]?.lastMinuteCalls || [],
                    disabledUntil: loadedState[key]?.disabledUntil || 0
                };
            });
            apiKeyState = newState;
            console.log("[API Manager] API key state loaded from file.");
        } else {
            // Initialize if file doesn't exist
            GEMINI_API_KEYS.forEach(key => {
                apiKeyState[key] = {
                    tokensUsedToday: 0,
                    lastUsedDate: new Date().toISOString().split('T')[0],
                    lastMinuteCalls: [],
                    disabledUntil: 0
                };
            });
            saveApiKeyState(); // Save initial state
            console.log("[API Manager] API key state initialized for the first time.");
        }
    } catch (error) {
        console.error("[API Manager] Error loading API key state:", error);
        // Fallback to initializing in memory if loading fails
        GEMINI_API_KEYS.forEach(key => {
            apiKeyState[key] = {
                tokensUsedToday: 0,
                lastUsedDate: new Date().toISOString().split('T')[0],
                lastMinuteCalls: [],
                disabledUntil: 0
            };
        });
    }
}

function saveApiKeyState() {
    try {
        fs.writeFileSync(API_KEY_STATE_FILE, JSON.stringify(apiKeyState, null, 2), 'utf8');
        // console.log("[API Manager] API key state saved to file.");
    } catch (error) {
        console.error("[API Manager] Error saving API key state:", error);
    }
}

// Load state immediately when the module is required
loadApiKeyState();

// --- Core API Key Management Functions ---

/**
 * Estimates tokens from a string. This is a very rough estimate.
 * @param {string} text
 * @returns {number}
 */
function estimateTokens(text) {
    if (!text) return 0;
    // A common heuristic for English is 4 characters per token.
    // This is a simplified approach. For true accuracy, one would use
    // Google's tokenization library or their `countTokens` API.
    return Math.ceil(text.length / 4);
}

/**
 * Gets an available API key based on usage and rate limits.
 * It prioritizes keys that are not disabled, haven't hit daily limits,
 * and haven't hit RPM limits, choosing the least recently used one.
 * @returns {string | null} An available API key string or null if none are available.
 */
function getAvailableApiKey() {
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];
    let bestKey = null;
    let leastRecentUsageTime = Infinity;

    for (const key of GEMINI_API_KEYS) {
        const data = apiKeyState[key];

        // Ensure daily usage is reset if the date has changed
        if (data.lastUsedDate !== today) {
            data.tokensUsedToday = 0;
            data.lastUsedDate = today;
            data.lastMinuteCalls = []; // Clear RPM history for new day
            data.disabledUntil = 0; // Re-enable for new day
            console.log(`[API Manager] Key ${key.substring(0, 5)}... usage reset for new day.`);
            saveApiKeyState(); // Persist the reset immediately
        }

        // 1. Check if the key is temporarily disabled
        if (data.disabledUntil > now) {
            continue; // Skip disabled keys
        }

        // 2. Check daily token limit
        // Using a threshold helps proactively switch keys, but the hard limit is GEMINI_PRO_DAILY_TOKEN_LIMIT_PER_KEY
        if (data.tokensUsedToday >= GEMINI_PRO_DAILY_TOKEN_LIMIT_PER_KEY) {
            continue; // Skip keys over daily limit
        }

        // 3. Check per-minute rate limit (RPM)
        data.lastMinuteCalls = data.lastMinuteCalls.filter(timestamp => now - timestamp < RPM_WINDOW_MS);
        if (data.lastMinuteCalls.length >= MAX_RPM_CALLS_PER_KEY) {
            continue; // Skip keys over RPM limit
        }

        // If the key passes all checks, consider it
        // Prioritize the key that was used least recently
        // The last element of lastMinuteCalls represents the most recent usage
        const currentKeyLastUsage = data.lastMinuteCalls.length > 0 ? data.lastMinuteCalls[data.lastMinuteCalls.length - 1] : 0; // 0 for never used in current minute window

        if (currentKeyLastUsage < leastRecentUsageTime) {
            bestKey = key;
            leastRecentUsageTime = currentKeyLastUsage;
        }
    }

    if (bestKey) {
        // Mark the chosen key as used now for RPM tracking
        apiKeyState[bestKey].lastMinuteCalls.push(now);
        saveApiKeyState(); // Persist the usage immediately
        return bestKey;
    }

    console.warn('[API Manager] No API key currently available. All are either disabled, daily-limited, or RPM-limited.');
    return null;
}

/**
 * Updates the usage for a specific API key. Call this after a successful API request.
 * @param {string} apiKey - The API key string.
 * @param {number} tokens - The number of tokens estimated to be used for the *response*.
 */
function updateKeyUsage(apiKey, tokens) {
    if (apiKeyState[apiKey]) {
        apiKeyState[apiKey].tokensUsedToday += tokens;
        console.log(`[API Manager] Key ${apiKey.substring(0, 5)}... usage: ${apiKeyState[apiKey].tokensUsedToday}/${GEMINI_PRO_DAILY_TOKEN_LIMIT_PER_KEY} tokens today.`);
        saveApiKeyState(); // Persist the updated usage
    } else {
        console.warn(`[API Manager] Attempted to update usage for unknown key: ${apiKey.substring(0, 5)}...`);
    }
}

/**
 * Disables an API key temporarily, typically after a 429 error.
 * @param {string} apiKey - The API key string.
 */
function disableKeyTemporarily(apiKey) {
    const keyData = apiKeyState[apiKey];
    if (keyData) {
        keyData.disabledUntil = Date.now() + TEMP_DISABLE_TIME_MS;
        console.warn(`[API Manager] Key ${apiKey.substring(0, 5)}... temporarily disabled until ${new Date(keyData.disabledUntil).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}.`);
        saveApiKeyState(); // Persist the disabled state
    }
}

/**
 * Resets daily usage for all keys. This should be called by a daily cron job.
 * Note: The `getAvailableApiKey` function also handles daily resets if it detects a date change.
 * This explicit `resetDailyKeyUsage` function is for cleaner cron job scheduling.
 */
function resetDailyKeyUsage() {
    const today = new Date().toISOString().split('T')[0];
    console.log(`[API Manager] Explicit daily API key usage reset initiated at ${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}.`);
    GEMINI_API_KEYS.forEach(key => {
        apiKeyState[key].tokensUsedToday = 0;
        apiKeyState[key].lastUsedDate = today;
        apiKeyState[key].lastMinuteCalls = []; // Clear RPM history
        apiKeyState[key].disabledUntil = 0; // Re-enable all keys
    });
    saveApiKeyState(); // Persist the reset
}

module.exports = {
    getAvailableApiKey,
    updateKeyUsage,
    disableKeyTemporarily,
    resetDailyKeyUsage, // Export this for the cron job
    estimateTokens,
    GEMINI_API_KEYS, // Still useful for knowing total key count
    GEMINI_PRO_DAILY_TOKEN_LIMIT_PER_KEY, // Renamed for clarity
    MAX_RPM_CALLS_PER_KEY
};