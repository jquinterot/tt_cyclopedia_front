import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { usePostById } from "./usePostById";

const mockPost = {
  id: "post-1",
  title: "Great blade!",
  content: "This blade has amazing control.",
  image_url: "/test.jpg",
  likes: 5,
  likedByCurrentUser: false,
  author: "player1",
  timestamp: "2024-01-01T00:00:00Z",
};

const mockGet = vi.fn();

vi.mock("@/config/apiClient", () => ({
  apiClient: {
    get: (...args: unknown[]) => mockGet(...args),
  },
  SESSION_EXPIRED_EVENT: "session-expired",
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: true }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("usePostById", () => {
  beforeEach(() => {
    queryClient.clear();
    mockGet.mockReset();
  });

  test("fetches post by id", async () => {
    mockGet.mockResolvedValueOnce({ data: mockPost });

    const { result } = renderHook(() => usePostById("post-1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockGet).toHaveBeenCalledWith("/posts/post-1");
    expect(result.current.post).toEqual({
      ...mockPost,
      likedByCurrentUser: false,
    });
  });

  test("converts likedByCurrentUser to boolean", async () => {
    mockGet.mockResolvedValueOnce({
      data: { ...mockPost, likedByCurrentUser: 1 },
    });

    const { result } = renderHook(() => usePostById("post-1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.post?.likedByCurrentUser).toBe(true);
  });

  test("does not fetch when postId is empty", async () => {
    const { result } = renderHook(() => usePostById(""), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(mockGet).not.toHaveBeenCalled();
  });

  test("handles error state", async () => {
    mockGet.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => usePostById("post-1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.post).toBeUndefined();
  });

  test("refetch refreshes data", async () => {
    mockGet.mockResolvedValueOnce({ data: mockPost });

    const { result } = renderHook(() => usePostById("post-1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    mockGet.mockResolvedValueOnce({ data: { ...mockPost, likes: 10 } });

    result.current.refetch();

    await waitFor(() => expect(result.current.post?.likes).toBe(10));
  });
});
