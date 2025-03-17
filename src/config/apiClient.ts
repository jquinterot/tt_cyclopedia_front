import axios from 'axios';

// Determine environment (Vite uses import.meta.env)
const isDevelopment = import.meta.env.MODE === 'development';

// Get base URL from environment variables (Vite requires VITE_ prefix)
const baseURL = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_PROD;

if (!baseURL) {
  throw new Error('Missing API base URL in environment variables');
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});