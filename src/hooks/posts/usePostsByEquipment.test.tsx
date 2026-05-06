import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { usePostsByEquipment } from "./usePostsByEquipment";

const mockPosts = [
  {
    id: "post-1",
    title: "Great blade!",
    content: "This blade has amazing control.",
    image_url: "/test.jpg",
    likes: 5,
    likedByCurrentUser: false,
    author: "player1",
    timestamp: "2024-01-01T00:00:00Z",
    equipment: {
      id: "eq-1",
      name: "Viscaria",
      brand: "Butterfly",
      category: "blade",
    },
  },
  {
    id: "post-2",
    title: "Good speed",
    content: "Fast but controllable.",
    image_url: "/test2.jpg",
    likes: 3,
    likedByCurrentUser: true,
    author: "player2",
    timestamp: "2024-01-02T00:00:00Z",
    equipment: {
      id: "eq-1",
      name: "Viscaria",
      brand: "Butterfly",
      category: "blade",
    },
  },
];

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

describe("usePostsByEquipment", () => {
  beforeEach(() => {
    queryClient.clear();
    mockGet.mockReset();
  });

  test("fetches posts for given equipment id", async () => {
    mockGet.mockResolvedValueOnce({ data: mockPosts });

    const { result } = renderHook(() => usePostsByEquipment("eq-1"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockGet).toHaveBeenCalledWith("/posts?equipment_id=eq-1");
    expect(result.current.posts).toHaveLength(2);
    expect(result.current.posts?.[0].title).toBe("Great blade!");
    expect(result.current.posts?.[0].likedByCurrentUser).toBe(false);
    expect(result.current.posts?.[1].likedByCurrentUser).toBe(true);
  });

  test("returns empty array when no posts found", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => usePostsByEquipment("eq-999"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test("does not fetch when equipmentId is empty", async () => {
    const { result } = renderHook(() => usePostsByEquipment(""), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(mockGet).not.toHaveBeenCalled();
  });

  test("handles error state", async () => {
    mockGet.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => usePostsByEquipment("eq-1"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.posts).toBeUndefined();
  });

  test("converts likedByCurrentUser to boolean", async () => {
    const postsWithMixedLikes = [
      { ...mockPosts[0], likedByCurrentUser: 1 },
      { ...mockPosts[1], likedByCurrentUser: 0 },
    ];
    mockGet.mockResolvedValueOnce({ data: postsWithMixedLikes });

    const { result } = renderHook(() => usePostsByEquipment("eq-1"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.posts?.[0].likedByCurrentUser).toBe(true);
    expect(result.current.posts?.[1].likedByCurrentUser).toBe(false);
  });
});
