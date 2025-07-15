// config/apiClient.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { RequestThrottler, APICallLimiter, BehaviorDetector } from '@/utils/security';

// Single environment variable for both environments
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error('Missing VITE_API_BASE_URL in environment variables');
}

// Initialize DDoS protection utilities
const requestThrottler = new RequestThrottler(1000); // 1 second between calls
const apiCallLimiter = new APICallLimiter(60, 1000); // 60 calls per minute, 1000 per hour
const behaviorDetector = new BehaviorDetector(30, 500); // 30 actions per minute, 500 per hour

// Clean up old data periodically
setInterval(() => {
  apiCallLimiter.cleanup();
}, 60000); // Every minute

// Custom event for session expiration
export const SESSION_EXPIRED_EVENT = 'session-expired';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 10 second timeout
});

// Enhanced request interceptor with DDoS protection
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : undefined;
    
    // Add JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // DDoS Protection Checks
    const endpoint = config.url || '';
    
    // 1. Check request throttling
    if (!requestThrottler.canMakeRequest(endpoint)) {
      const timeUntilNext = requestThrottler.getTimeUntilNextRequest(endpoint);
      throw new Error(`Request throttled. Please wait ${Math.ceil(timeUntilNext / 1000)} seconds.`);
    }

    // 2. Check API call limits
    if (!apiCallLimiter.canMakeCall(endpoint)) {
      const remaining = apiCallLimiter.getRemainingCalls(endpoint);
      throw new Error(`API rate limit exceeded. Remaining: ${remaining.minute} per minute, ${remaining.hour} per hour.`);
    }

    // 3. Check for suspicious behavior
    if (!behaviorDetector.recordAction(`api_call:${endpoint}`, userId)) {
      throw new Error('Suspicious behavior detected. Please slow down your requests.');
    }

    // Add request timestamp for tracking
    (config as any).metadata = { startTime: Date.now() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced response interceptor with error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful requests for monitoring
    const startTime = (response.config as any).metadata?.startTime || Date.now();
    const duration = Date.now() - startTime;
    console.debug(`API call to ${response.config.url} completed in ${duration}ms`);
    
    return response;
  },
  (error: AxiosError) => {
    // Handle rate limiting responses from server
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      const message = retryAfter 
        ? `Rate limited. Please wait ${retryAfter} seconds.`
        : 'Rate limited. Please try again later.';
      
      console.warn('Server rate limit hit:', message);
    }

    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear authentication data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      
      // Dispatch custom event to notify AuthContext
      window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
    }

    // Log errors for monitoring
    const startTime = (error.config as any).metadata?.startTime || Date.now();
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      duration: Date.now() - startTime
    });

    return Promise.reject(error);
  }
);

// Optional: Export baseURL for direct access where needed
export const API_BASE_URL = baseURL;

// Export protection utilities for manual use
export { requestThrottler, apiCallLimiter, behaviorDetector };