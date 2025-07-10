const dotenv = require('dotenv');
dotenv.config();

const GEMINI_API_KEYS = process.env.GEMINI_API_KEYS ? process.env.GEMINI_API_KEYS.split(',') : [];
const GEMINI_PRO_DAILY_TOKEN_LIMIT = 150000; // Example: 150,000 tokens per day per key
const USAGE_THRESHOLD_PERCENT = 0.7; // Switch to new key at 70% usage

let apiKeyState = {}; 

GEMINI_API_KEYS.forEach(key => {
    apiKeyState[key] = {
        tokensUsedToday: 0,
        lastUsedDate: new Date().toISOString().split('T')[0] //YYYY-MM-DD
    };
});

function getAvailableApiKey() {
    const today = new Date().toISOString().split('T')[0];

    for (const key of GEMINI_API_KEYS) {
        if (!apiKeyState[key]) {
            apiKeyState[key] = { tokensUsedToday: 0, lastUsedDate: today };
        }

        if (apiKeyState[key].lastUsedDate !== today) {
            apiKeyState[key].tokensUsedToday = 0;
            apiKeyState[key].lastUsedDate = today;
            console.log(`API Key ${key.substring(0, 5)}... usage reset for new day.`);
        }

        if (apiKeyState[key].tokensUsedToday < GEMINI_PRO_DAILY_TOKEN_LIMIT * USAGE_THRESHOLD_PERCENT) {
            console.log(`Using API Key ${key.substring(0, 5)}... (Used: ${apiKeyState[key].tokensUsedToday} tokens)`);
            return key;
        } else {
            console.warn(`API Key ${key.substring(0, 5)}... has reached its ${USAGE_THRESHOLD_PERCENT * 100}% usage threshold for today.`);
        }
    }
    console.error('No available API keys within daily usage limits.');
    return null;
}
function updateKeyUsage(apiKey, tokens) {
    if (apiKeyState[apiKey]) {
        apiKeyState[apiKey].tokensUsedToday += tokens;
    }
}

module.exports = {
    getAvailableApiKey,
    updateKeyUsage,
    GEMINI_API_KEYS,
    GEMINI_PRO_DAILY_TOKEN_LIMIT
};