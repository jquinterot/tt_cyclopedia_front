import { useCallback } from 'react';
import { debounce, throttle, RequestThrottler, APICallLimiter, BehaviorDetector } from '@/utils/security';

// Global instances for consistent protection across the app
const requestThrottler = new RequestThrottler(1000); // 1 second between calls
const apiCallLimiter = new APICallLimiter(60, 1000); // 60 calls per minute, 1000 per hour
const behaviorDetector = new BehaviorDetector(30, 500); // 30 actions per minute, 500 per hour

/**
 * Custom hook for DDoS protection utilities
 */
export const useDDoSProtection = () => {
  /**
   * Creates a debounced version of a function
   */
  const createDebouncedFunction = useCallback((
    func: (...args: unknown[]) => unknown,
    delay: number = 300
  ) => {
    return debounce(func, delay);
  }, []);

  /**
   * Creates a throttled version of a function
   */
  const createThrottledFunction = useCallback((
    func: (...args: unknown[]) => unknown,
    limit: number = 1000
  ) => {
    return throttle(func, limit);
  }, []);

  /**
   * Checks if an action is allowed based on rate limiting
   */
  const isActionAllowed = useCallback((action: string, userId?: string): boolean => {
    return behaviorDetector.recordAction(action, userId);
  }, []);

  /**
   * Checks if an API call is allowed
   */
  const isAPICallAllowed = useCallback((endpoint: string): boolean => {
    return apiCallLimiter.canMakeCall(endpoint);
  }, []);

  /**
   * Checks if a request is allowed (throttling)
   */
  const isRequestAllowed = useCallback((endpoint: string): boolean => {
    return requestThrottler.canMakeRequest(endpoint);
  }, []);

  /**
   * Gets remaining API calls for an endpoint
   */
  const getRemainingAPICalls = useCallback((endpoint: string) => {
    return apiCallLimiter.getRemainingCalls(endpoint);
  }, []);

  /**
   * Gets time until next request is allowed
   */
  const getTimeUntilNextRequest = useCallback((endpoint: string): number => {
    return requestThrottler.getTimeUntilNextRequest(endpoint);
  }, []);

  /**
   * Records a user action for behavior analysis
   */
  const recordUserAction = useCallback((action: string, userId?: string): boolean => {
    return behaviorDetector.recordAction(action, userId);
  }, []);

  /**
   * Checks if user behavior is suspicious
   */
  const isSuspiciousBehavior = useCallback((userId?: string): boolean => {
    return behaviorDetector.isSuspicious(userId);
  }, []);

  return {
    createDebouncedFunction,
    createThrottledFunction,
    isActionAllowed,
    isAPICallAllowed,
    isRequestAllowed,
    getRemainingAPICalls,
    getTimeUntilNextRequest,
    recordUserAction,
    isSuspiciousBehavior,
    // Export the protection instances for direct access
    requestThrottler,
    apiCallLimiter,
    behaviorDetector
  };
}; 