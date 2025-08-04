const BASE_URL = import.meta.env?.VITE_BACKEND_URL || '';
export const AI_GURU_API_ENDPOINT = BASE_URL ? `${BASE_URL}/api/ai-guru-chat` : '/api/ai-guru-chat';
export const API_BASE_URL = BASE_URL ? `${BASE_URL}/api` : '/api';