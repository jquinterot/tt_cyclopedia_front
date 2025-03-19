// config/apiClient.ts
import axios from 'axios';

// Single environment variable for both environments
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error('Missing VITE_API_BASE_URL in environment variables');
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Export baseURL for direct access where needed
export const API_BASE_URL = baseURL;