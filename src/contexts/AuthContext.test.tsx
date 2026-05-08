import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("throws error when used outside AuthProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within an AuthProvider");

    (vi.spyOn(console, "error") as ReturnType<typeof vi.spyOn>).mockRestore();
  });

  test("initial state is unauthenticated", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  test("login sets authenticated state", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const mockUser = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
    };

    act(() => {
      result.current.login("mock-token", mockUser);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBe("mock-token");
    expect(result.current.user).toEqual(mockUser);
    expect(localStorage.getItem("authToken")).toBe("mock-token");
    expect(localStorage.getItem("isAuthenticated")).toBe("true");
  });

  test("logout clears authenticated state", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const mockUser = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
    };

    act(() => {
      result.current.login("mock-token", mockUser);
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem("authToken")).toBeNull();
    expect(localStorage.getItem("isAuthenticated")).toBeNull();
  });

  test("restores auth state from localStorage", () => {
    const mockUser = { id: "2", username: "storeduser" };
    localStorage.setItem("authToken", "stored-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("isAuthenticated", "true");

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBe("stored-token");
    expect(result.current.user).toEqual(mockUser);
  });

  test("clears corrupted localStorage data on mount", () => {
    localStorage.setItem("authToken", "bad-token");
    localStorage.setItem("user", "{invalid-json");
    localStorage.setItem("isAuthenticated", "true");

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  test("updateToken updates token in state and localStorage", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.updateToken("new-token");
    });

    expect(result.current.token).toBe("new-token");
    expect(localStorage.getItem("authToken")).toBe("new-token");
  });

  test("handleSessionExpiration clears auth and navigates", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const mockUser = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
    };

    act(() => {
      result.current.login("mock-token", mockUser);
    });

    act(() => {
      result.current.handleSessionExpiration();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
});
