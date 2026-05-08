import { describe, it, expect } from "vitest";
import {
  validatePassword,
  validateUsername,
  validateEmail,
  validatePasswordMatch,
  sanitizeInput,
  RateLimiter,
  RequestThrottler,
  APICallLimiter,
  BehaviorDetector,
  generateCSRFToken,
  validateCSRFToken,
  debounce,
  throttle,
} from "@/utils/security";

describe("validatePassword", () => {
  it("validates a strong password", () => {
    const result = validatePassword("StrongP4ss!");
    expect(result.isValid).toBe(true);
    expect(result.strength).toBe("strong");
    expect(result.errors).toHaveLength(0);
  });

  it("validates password with minimum requirements", () => {
    const result = validatePassword("password1");
    expect(result.isValid).toBe(true);
    expect(result.strength).toBe("strong");
  });

  it("rejects weak password with missing requirements", () => {
    const result = validatePassword("abc");
    expect(result.isValid).toBe(false);
    expect(result.strength).toBe("weak");
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("rejects password without numbers", () => {
    const result = validatePassword("abcdefgh");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Need number");
  });

  it("rejects password below minimum length", () => {
    const result = validatePassword("a1");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Min 8 chars");
  });
});

describe("validateUsername", () => {
  it("validates a correct username", () => {
    const result = validateUsername("john_doe123");
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects username too short", () => {
    const result = validateUsername("ab");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Min 3 chars");
  });

  it("rejects username with special chars", () => {
    const result = validateUsername("john@doe");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Letters, numbers, _ and - only");
  });

  it("rejects reserved username", () => {
    const result = validateUsername("admin");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Username reserved");
  });

  it("rejects username too long", () => {
    const result = validateUsername("a".repeat(31));
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Max 30 chars");
  });
});

describe("validateEmail", () => {
  it("validates correct email", () => {
    const result = validateEmail("user@example.com");
    expect(result.isValid).toBe(true);
  });

  it("rejects email without @", () => {
    const result = validateEmail("userexample.com");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Need @ symbol");
  });

  it("rejects email without dot", () => {
    const result = validateEmail("user@example");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Need dot");
  });
});

describe("validatePasswordMatch", () => {
  it("validates matching passwords", () => {
    const result = validatePasswordMatch("abc12345", "abc12345");
    expect(result.isValid).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = validatePasswordMatch("abc12345", "wrong");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Passwords mismatch");
  });
});

describe("sanitizeInput", () => {
  it("removes HTML tags", () => {
    expect(sanitizeInput("<script>alert('xss')</script>")).toBe(
      "scriptalert('xss')/script",
    );
  });

  it("removes javascript protocol", () => {
    expect(sanitizeInput("javascript:alert('hi')")).toBe("alert('hi')");
  });

  it("removes event handlers", () => {
    expect(sanitizeInput("<img onload='doBad()'>")).toContain("img");
    expect(sanitizeInput("<img onload='doBad()'>")).not.toContain("onload");
  });

  it("trims whitespace", () => {
    expect(sanitizeInput("  hello  ")).toBe("hello");
  });
});

describe("RateLimiter", () => {
  it("allows first attempt", () => {
    const limiter = new RateLimiter(3, 60000);
    expect(limiter.isAllowed("user1")).toBe(true);
  });

  it("blocks after max attempts", () => {
    const limiter = new RateLimiter(2, 60000);
    limiter.isAllowed("user1");
    limiter.isAllowed("user1");
    expect(limiter.isAllowed("user1")).toBe(false);
  });

  it("reports remaining attempts", () => {
    const limiter = new RateLimiter(5, 60000);
    limiter.isAllowed("user1");
    expect(limiter.getRemainingAttempts("user1")).toBe(4);
  });

  it("resets identifier", () => {
    const limiter = new RateLimiter(2, 60000);
    limiter.isAllowed("user1");
    limiter.reset("user1");
    expect(limiter.getRemainingAttempts("user1")).toBe(2);
  });
});

describe("RequestThrottler", () => {
  it("allows first request", () => {
    const throttler = new RequestThrottler(1000);
    expect(throttler.canMakeRequest("/api/test")).toBe(true);
  });

  it("blocks rapid subsequent requests", () => {
    const throttler = new RequestThrottler(1000);
    throttler.canMakeRequest("/api/test");
    expect(throttler.canMakeRequest("/api/test")).toBe(false);
  });

  it("reports time until next request", () => {
    const throttler = new RequestThrottler(1000);
    throttler.canMakeRequest("/api/test");
    expect(throttler.getTimeUntilNextRequest("/api/test")).toBeGreaterThan(0);
  });

  it("allows requests to different endpoints", () => {
    const throttler = new RequestThrottler(1000);
    throttler.canMakeRequest("/api/a");
    expect(throttler.canMakeRequest("/api/b")).toBe(true);
  });
});

describe("APICallLimiter", () => {
  it("allows calls under limit", () => {
    const limiter = new APICallLimiter(60, 1000);
    expect(limiter.canMakeCall("/api/test")).toBe(true);
  });

  it("reports remaining calls", () => {
    const limiter = new APICallLimiter(60, 1000);
    const remaining = limiter.getRemainingCalls("/api/test");
    expect(remaining.minute).toBeGreaterThan(0);
    expect(remaining.hour).toBeGreaterThan(0);
  });

  it("cleanup removes old entries", () => {
    const limiter = new APICallLimiter(60, 1000);
    limiter.canMakeCall("/api/test");
    limiter.cleanup();
    const remaining = limiter.getRemainingCalls("/api/test");
    expect(remaining.minute).toBe(59);
  });
});

describe("BehaviorDetector", () => {
  it("allows normal behavior", () => {
    const detector = new BehaviorDetector(30, 500);
    expect(detector.recordAction("search", "user1")).toBe(true);
  });

  it("detects rapid fire actions", () => {
    const detector = new BehaviorDetector(2, 500);
    detector.recordAction("search", "user1");
    detector.recordAction("search", "user1");
    expect(detector.recordAction("search", "user1")).toBe(false);
  });

  it("identifies suspicious user", () => {
    const detector = new BehaviorDetector(2, 500);
    detector.recordAction("search", "user1");
    detector.recordAction("search", "user1");
    expect(detector.isSuspicious("user1")).toBe(true);
  });

  it("identifies non-suspicious user", () => {
    const detector = new BehaviorDetector(30, 500);
    expect(detector.isSuspicious("user1")).toBe(false);
  });
});

describe("generateCSRFToken", () => {
  it("generates a 64-char token", () => {
    const token = generateCSRFToken();
    expect(token).toHaveLength(64);
  });

  it("generates unique tokens", () => {
    const token1 = generateCSRFToken();
    const token2 = generateCSRFToken();
    expect(token1).not.toBe(token2);
  });
});

describe("validateCSRFToken", () => {
  it("validates matching tokens", () => {
    const token = generateCSRFToken();
    expect(validateCSRFToken(token, token)).toBe(true);
  });

  it("rejects mismatched tokens", () => {
    expect(validateCSRFToken("a".repeat(64), "b".repeat(64))).toBe(false);
  });

  it("rejects wrong length token", () => {
    expect(validateCSRFToken("abc", "abc")).toBe(false);
  });
});

describe("debounce", () => {
  it("delays function execution", async () => {
    await new Promise<void>((resolve) => {
      let called = false;
      const fn = debounce(() => {
        called = true;
      }, 50);
      fn();
      expect(called).toBe(false);
      setTimeout(() => {
        expect(called).toBe(true);
        resolve();
      }, 100);
    });
  });
});

describe("throttle", () => {
  it("executes first call immediately", () => {
    let called = false;
    const fn = throttle(() => {
      called = true;
    }, 100);
    fn();
    expect(called).toBe(true);
  });

  it("blocks calls within throttle limit", () => {
    let count = 0;
    const fn = throttle(() => {
      count++;
    }, 100);
    fn();
    fn();
    expect(count).toBe(1);
  });
});
