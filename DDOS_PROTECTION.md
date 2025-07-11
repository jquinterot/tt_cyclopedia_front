# DDoS Protection Guide for Frontend

This document outlines the comprehensive DDoS protection measures implemented in the TT Cyclopedia frontend application to prevent frontend-initiated attacks.

## Overview

DDoS (Distributed Denial of Service) attacks can originate from the frontend through:
- Rapid API calls from malicious scripts
- Automated form submissions
- Excessive user interactions
- Bot-like behavior patterns

Our protection strategy focuses on **prevention**, **detection**, and **mitigation** at the client-side level.

## Protection Layers

### 1. Rate Limiting (`RateLimiter`)

**Location**: `src/utils/security.ts`

**Purpose**: Limits the number of attempts for specific actions within a time window.

**Usage**:
```typescript
const rateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

if (!rateLimiter.isAllowed('signup-form')) {
  // Block the action
}
```

**Configuration**:
- **Signup**: 5 attempts per 15 minutes
- **Login**: 5 attempts per 15 minutes
- **Password Reset**: 3 attempts per hour

### 2. Request Throttling (`RequestThrottler`)

**Location**: `src/utils/security.ts`

**Purpose**: Ensures minimum time intervals between API calls to the same endpoint.

**Usage**:
```typescript
const throttler = new RequestThrottler(1000); // 1 second between calls

if (!throttler.canMakeRequest('/api/posts')) {
  // Block the request
}
```

**Configuration**:
- **API Calls**: 1 second minimum interval
- **Search Requests**: 500ms minimum interval
- **Like/Unlike Actions**: 2 seconds minimum interval

### 3. API Call Limiting (`APICallLimiter`)

**Location**: `src/utils/security.ts`

**Purpose**: Tracks and limits API calls per session with minute and hour windows.

**Usage**:
```typescript
const limiter = new APICallLimiter(60, 1000); // 60 per minute, 1000 per hour

if (!limiter.canMakeCall('/api/posts')) {
  // Block the API call
}
```

**Configuration**:
- **Per Minute**: 60 API calls
- **Per Hour**: 1000 API calls
- **Automatic Cleanup**: Every minute

### 4. Behavior Detection (`BehaviorDetector`)

**Location**: `src/utils/security.ts`

**Purpose**: Monitors user behavior patterns to detect suspicious activity.

**Usage**:
```typescript
const detector = new BehaviorDetector(30, 500); // 30 actions per minute, 500 per hour

if (!detector.recordAction('like_post', userId)) {
  // Suspicious behavior detected
}
```

**Configuration**:
- **Per Minute**: 30 actions
- **Per Hour**: 500 actions
- **User-specific tracking**: Yes

### 5. Debouncing and Throttling Utilities

**Location**: `src/utils/security.ts`

**Purpose**: Prevents rapid function executions.

**Usage**:
```typescript
// Debounce search input
const debouncedSearch = debounce(searchFunction, 300);

// Throttle scroll events
const throttledScroll = throttle(scrollHandler, 100);
```

### 6. Enhanced API Client

**Location**: `src/config/apiClient.ts`

**Purpose**: Centralized DDoS protection for all API calls.

**Features**:
- Automatic request throttling
- API call limiting
- Behavior detection
- Error handling for 429 responses
- Request timing and logging

### 7. Custom Hook (`useDDoSProtection`)

**Location**: `src/hooks/useDDoSProtection.ts`

**Purpose**: Provides easy-to-use DDoS protection utilities for React components.

**Usage**:
```typescript
const { createDebouncedFunction, isActionAllowed } = useDDoSProtection();

const debouncedSearch = createDebouncedFunction(searchFunction, 500);
```

## Implementation Examples

### Search Bar with Protection

```typescript
import { useDDoSProtection } from '@/hooks/useDDoSProtection';

export default function SearchBar({ onSearch }) {
  const { createDebouncedFunction, isActionAllowed } = useDDoSProtection();
  
  const debouncedSearch = createDebouncedFunction((query) => {
    if (!isActionAllowed('search', userId)) {
      console.warn('Search blocked due to rate limiting');
      return;
    }
    onSearch(query);
  }, 500);
  
  // ... rest of component
}
```

### Form Submission with Rate Limiting

```typescript
import { RateLimiter } from '@/utils/security';

const signupLimiter = new RateLimiter(5, 15 * 60 * 1000);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!signupLimiter.isAllowed('signup-form')) {
    toast.error('Too many signup attempts. Please try again later.');
    return;
  }
  
  // Proceed with signup
};
```

### Like Button with Throttling

```typescript
import { throttle } from '@/utils/security';

const throttledLike = throttle(() => {
  // Like logic here
}, 2000); // 2 seconds between likes

const handleLike = () => {
  throttledLike();
};
```

## Configuration

### Environment Variables

```env
# API rate limiting (optional, defaults to 60/min, 1000/hour)
VITE_API_RATE_LIMIT_PER_MINUTE=60
VITE_API_RATE_LIMIT_PER_HOUR=1000

# Request throttling (optional, defaults to 1000ms)
VITE_REQUEST_THROTTLE_MS=1000

# Behavior detection (optional, defaults to 30/min, 500/hour)
VITE_BEHAVIOR_LIMIT_PER_MINUTE=30
VITE_BEHAVIOR_LIMIT_PER_HOUR=500
```

### Custom Limits

You can customize limits for specific actions:

```typescript
// Stricter limits for sensitive actions
const loginLimiter = new RateLimiter(3, 15 * 60 * 1000); // 3 attempts per 15 minutes
const passwordResetLimiter = new RateLimiter(2, 60 * 60 * 1000); // 2 attempts per hour

// Relaxed limits for safe actions
const searchLimiter = new RateLimiter(100, 60 * 1000); // 100 searches per minute
```

## Monitoring and Logging

### Console Logs

The system logs various events for monitoring:

```javascript
// Successful API calls
console.debug(`API call to /api/posts completed in 150ms`);

// Rate limiting events
console.warn('Server rate limit hit: Rate limited. Please wait 30 seconds.');

// Suspicious behavior
console.warn('Action blocked due to suspicious behavior: search');

// API errors
console.error('API Error:', {
  url: '/api/posts',
  status: 429,
  message: 'Too Many Requests',
  duration: 2000
});
```

### Error Handling

The system handles various error scenarios:

- **429 (Too Many Requests)**: Automatic retry-after handling
- **401/403 (Auth Errors)**: Automatic token cleanup
- **Network Errors**: Graceful degradation
- **Rate Limit Exceeded**: User-friendly error messages

## Best Practices

### 1. Progressive Enhancement

Always provide fallbacks when protection measures are triggered:

```typescript
if (!isActionAllowed('search')) {
  // Show user-friendly message
  toast.warning('Please wait a moment before searching again');
  return;
}
```

### 2. User Feedback

Inform users when actions are blocked:

```typescript
if (!throttler.canMakeRequest('/api/like')) {
  const timeUntilNext = throttler.getTimeUntilNextRequest('/api/like');
  toast.info(`Please wait ${Math.ceil(timeUntilNext / 1000)} seconds before liking again`);
  return;
}
```

### 3. Graceful Degradation

Ensure the app remains functional even when protection is active:

```typescript
// Disable buttons instead of breaking functionality
const isRateLimited = !isActionAllowed('like');
<button disabled={isRateLimited} onClick={handleLike}>
  {isRateLimited ? 'Please wait...' : 'Like'}
</button>
```

### 4. Monitoring

Regularly monitor protection effectiveness:

```typescript
// Track blocked actions
const blockedActions = {
  search: 0,
  like: 0,
  signup: 0
};

// Log for analysis
console.info('Protection stats:', blockedActions);
```

## Security Considerations

### 1. Client-Side Limitations

Remember that client-side protection can be bypassed by:
- Disabling JavaScript
- Modifying browser code
- Using automated tools

**Solution**: Always implement server-side protection as well.

### 2. Storage Security

Rate limiting data is stored in memory and cleared on page refresh.

**Solution**: Consider persistent storage for stricter protection.

### 3. User Experience

Balance security with usability:

- Don't be too restrictive for legitimate users
- Provide clear feedback when actions are blocked
- Allow reasonable retry intervals

## Testing

### Unit Tests

Test protection utilities:

```typescript
describe('RateLimiter', () => {
  it('should allow requests within limits', () => {
    const limiter = new RateLimiter(5, 60000);
    expect(limiter.isAllowed('test')).toBe(true);
  });
  
  it('should block requests exceeding limits', () => {
    const limiter = new RateLimiter(1, 60000);
    limiter.isAllowed('test'); // First call
    expect(limiter.isAllowed('test')).toBe(false); // Second call blocked
  });
});
```

### Integration Tests

Test protection in components:

```typescript
describe('SearchBar with DDoS protection', () => {
  it('should debounce search requests', async () => {
    // Test implementation
  });
  
  it('should block rapid submissions', async () => {
    // Test implementation
  });
});
```

## Conclusion

This comprehensive DDoS protection system provides multiple layers of defense against frontend-initiated attacks while maintaining a good user experience. The system is:

- **Configurable**: Easy to adjust limits and thresholds
- **Transparent**: Clear logging and error messages
- **Performant**: Minimal impact on application performance
- **Maintainable**: Well-documented and testable

Remember that client-side protection is just one layer - always implement corresponding server-side protection for complete security. 