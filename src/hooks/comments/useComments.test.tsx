import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useComments } from "./useComments";

const mockComments = [
  {
    id: "comment-1",
    comment: "Great post!",
    user_id: "user-1",
    username: "player1",
    parent_id: null,
    liked_by_current_user: false,
    likes: 5,
    timestamp: "2024-01-01T00:00:00Z",
    post_id: "post-1",
  },
  {
    id: "comment-2",
    comment: "Thanks for sharing!",
    user_id: "user-2",
    username: "player2",
    parent_id: null,
    liked_by_current_user: true,
    likes: 3,
    timestamp: "2024-01-02T00:00:00Z",
    post_id: "post-1",
  },
];

const mockGet = vi.fn();

vi.mock("@/config/apiClient", () => ({
  apiClient: {
    get: (...args: unknown[]) => mockGet(...args),
  },
  SESSION_EXPIRED_EVENT: "session-expired",
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useComments", () => {
  beforeEach(() => {
    queryClient.clear();
    mockGet.mockReset();
  });

  test("fetches comments for given post id", async () => {
    mockGet.mockResolvedValueOnce({ data: mockComments });

    const { result } = renderHook(() => useComments("post-1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockGet).toHaveBeenCalledWith("/comments/post/post-1");
    expect(result.current.comments).toHaveLength(2);
    expect(result.current.comments?.[0].comment).toBe("Great post!");
  });

  test("returns empty array when no comments found", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => useComments("post-999"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.comments).toEqual([]);
  });

  test("does not fetch when postId is empty", async () => {
    const { result } = renderHook(() => useComments(""), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(mockGet).not.toHaveBeenCalled();
  });

  test("handles error state", async () => {
    mockGet.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useComments("post-1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.comments).toBeUndefined();
  });
});
