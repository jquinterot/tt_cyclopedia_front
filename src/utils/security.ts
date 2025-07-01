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