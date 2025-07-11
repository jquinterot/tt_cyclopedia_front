// Security utilities for user registration and authentication

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
}

export interface InputValidationResult {
  isValid: boolean;
  errors: string[];
}

// Password strength requirements
const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: false,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};

// Username requirements
const USERNAME_REQUIREMENTS = {
  minLength: 3,
  maxLength: 30,
  allowedChars: /^[a-zA-Z0-9_-]+$/,
};

/**
 * Validates password strength and requirements
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];
  let strengthScore = 0;

  // Check length
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Min ${PASSWORD_REQUIREMENTS.minLength} chars`);
  } else {
    strengthScore += 1;
  }

  if (password.length > PASSWORD_REQUIREMENTS.maxLength) {
    errors.push(`Max ${PASSWORD_REQUIREMENTS.maxLength} chars`);
  }

  // Check for uppercase letters
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Need uppercase');
  } else if (/[A-Z]/.test(password)) {
    strengthScore += 1;
  }

  // Check for lowercase letters
  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Need lowercase');
  } else if (/[a-z]/.test(password)) {
    strengthScore += 1;
  }

  // Check for numbers
  if (PASSWORD_REQUIREMENTS.requireNumbers && !/\d/.test(password)) {
    errors.push('Need number');
  } else if (/\d/.test(password)) {
    strengthScore += 1;
  }

  // Check for special characters
  if (PASSWORD_REQUIREMENTS.requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Need special char');
  } else if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    strengthScore += 1;
  }

  // Determine strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (strengthScore >= 3) {
    strength = 'strong';
  } else if (strengthScore >= 2) {
    strength = 'medium';
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Validates username requirements
 */
export function validateUsername(username: string): InputValidationResult {
  const errors: string[] = [];

  // Check length
  if (username.length < USERNAME_REQUIREMENTS.minLength) {
    errors.push(`Min ${USERNAME_REQUIREMENTS.minLength} chars`);
  }

  if (username.length > USERNAME_REQUIREMENTS.maxLength) {
    errors.push(`Max ${USERNAME_REQUIREMENTS.maxLength} chars`);
  }

  // Check allowed characters
  if (!USERNAME_REQUIREMENTS.allowedChars.test(username)) {
    errors.push('Letters, numbers, _ and - only');
  }

  // Check for common reserved usernames
  const reservedUsernames = ['admin', 'root', 'system', 'guest', 'test', 'user'];
  if (reservedUsernames.includes(username.toLowerCase())) {
    errors.push('Username reserved');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitizes user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Validates that passwords match
 */
export function validatePasswordMatch(password: string, confirmPassword: string): InputValidationResult {
  const errors: string[] = [];

  if (password !== confirmPassword) {
    errors.push('Passwords mismatch');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Rate limiting utility for form submissions
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Reset if window has passed
    if (now - attempt.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Check if max attempts reached
    if (attempt.count >= this.maxAttempts) {
      return false;
    }

    // Increment attempt count
    attempt.count += 1;
    attempt.lastAttempt = now;
    return true;
  }

  getRemainingAttempts(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return this.maxAttempts;
    return Math.max(0, this.maxAttempts - attempt.count);
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

/**
 * API Request Throttler - Prevents rapid API calls
 */
export class RequestThrottler {
  private lastCallTime: Map<string, number> = new Map();
  private minIntervalMs: number;

  constructor(minIntervalMs: number = 1000) { // 1 second between calls
    this.minIntervalMs = minIntervalMs;
  }

  canMakeRequest(endpoint: string): boolean {
    const now = Date.now();
    const lastCall = this.lastCallTime.get(endpoint);
    
    if (!lastCall || (now - lastCall) >= this.minIntervalMs) {
      this.lastCallTime.set(endpoint, now);
      return true;
    }
    
    return false;
  }

  getTimeUntilNextRequest(endpoint: string): number {
    const lastCall = this.lastCallTime.get(endpoint);
    if (!lastCall) return 0;
    
    const timeSinceLastCall = Date.now() - lastCall;
    return Math.max(0, this.minIntervalMs - timeSinceLastCall);
  }
}

/**
 * Debounce utility to prevent rapid function calls
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle utility to limit function execution frequency
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * API Call Limiter - Tracks and limits API calls per session
 */
export class APICallLimiter {
  private callCounts: Map<string, { count: number; resetTime: number }> = new Map();
  private maxCallsPerMinute: number;
  private maxCallsPerHour: number;

  constructor(maxCallsPerMinute: number = 60, maxCallsPerHour: number = 1000) {
    this.maxCallsPerMinute = maxCallsPerMinute;
    this.maxCallsPerHour = maxCallsPerHour;
  }

  canMakeCall(endpoint: string): boolean {
    const now = Date.now();
    const minuteKey = `${endpoint}:minute:${Math.floor(now / 60000)}`;
    const hourKey = `${endpoint}:hour:${Math.floor(now / 3600000)}`;

    // Check minute limit
    const minuteData = this.callCounts.get(minuteKey);
    if (minuteData && minuteData.count >= this.maxCallsPerMinute) {
      return false;
    }

    // Check hour limit
    const hourData = this.callCounts.get(hourKey);
    if (hourData && hourData.count >= this.maxCallsPerHour) {
      return false;
    }

    // Increment counters
    this.callCounts.set(minuteKey, {
      count: (minuteData?.count || 0) + 1,
      resetTime: now + 60000
    });

    this.callCounts.set(hourKey, {
      count: (hourData?.count || 0) + 1,
      resetTime: now + 3600000
    });

    return true;
  }

  getRemainingCalls(endpoint: string): { minute: number; hour: number } {
    const now = Date.now();
    const minuteKey = `${endpoint}:minute:${Math.floor(now / 60000)}`;
    const hourKey = `${endpoint}:hour:${Math.floor(now / 3600000)}`;

    const minuteData = this.callCounts.get(minuteKey);
    const hourData = this.callCounts.get(hourKey);

    return {
      minute: Math.max(0, this.maxCallsPerMinute - (minuteData?.count || 0)),
      hour: Math.max(0, this.maxCallsPerHour - (hourData?.count || 0))
    };
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now();
    for (const [key, data] of this.callCounts.entries()) {
      if (now > data.resetTime) {
        this.callCounts.delete(key);
      }
    }
  }
}

/**
 * Generates a secure random string for CSRF tokens
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates CSRF token
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken && token.length === 64;
}

/**
 * Validates email address format
 */
export function validateEmail(email: string): InputValidationResult {
  const errors: string[] = [];
  
  // Check minimum length
  if (email.length < 5) {
    errors.push('Min 5 chars');
  }
  
  // Check for @ symbol
  if (!email.includes('@')) {
    errors.push('Need @ symbol');
  }
  
  // Check for dot
  if (!email.includes('.')) {
    errors.push('Need dot');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Detects suspicious user behavior patterns
 */
export class BehaviorDetector {
  private actions: Map<string, { count: number; timestamps: number[] }> = new Map();
  private maxActionsPerMinute: number;
  private maxActionsPerHour: number;

  constructor(maxActionsPerMinute: number = 30, maxActionsPerHour: number = 500) {
    this.maxActionsPerMinute = maxActionsPerMinute;
    this.maxActionsPerHour = maxActionsPerHour;
  }

  recordAction(action: string, userId?: string): boolean {
    const now = Date.now();
    const key = userId ? `${userId}:${action}` : `anonymous:${action}`;
    
    const data = this.actions.get(key) || { count: 0, timestamps: [] };
    
    // Remove timestamps older than 1 hour
    data.timestamps = data.timestamps.filter(timestamp => now - timestamp < 3600000);
    
    // Check if action is suspicious
    const recentActions = data.timestamps.filter(timestamp => now - timestamp < 60000);
    if (recentActions.length >= this.maxActionsPerMinute) {
      return false; // Suspicious behavior detected
    }
    
    if (data.timestamps.length >= this.maxActionsPerHour) {
      return false; // Too many actions in the last hour
    }
    
    // Record the action
    data.count += 1;
    data.timestamps.push(now);
    this.actions.set(key, data);
    
    return true;
  }

  isSuspicious(userId?: string): boolean {
    const now = Date.now();
    const prefix = userId ? `${userId}:` : 'anonymous:';
    
    for (const [key, data] of this.actions.entries()) {
      if (key.startsWith(prefix)) {
        const recentActions = data.timestamps.filter(timestamp => now - timestamp < 60000);
        if (recentActions.length >= this.maxActionsPerMinute) {
          return true;
        }
      }
    }
    
    return false;
  }
} 