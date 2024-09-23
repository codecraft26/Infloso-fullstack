// src/config/apiConfig.js

const API_BASE_URL = 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/password/forgot`,
  RESET_PASSWORD: (token) => `${API_BASE_URL}/password/reset/${token}`,
};
