import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useEquipmentRecommend, RecommendRequest } from "./useEquipmentRecommend";

const mockRecommendation = {
  blade: {
    id: "eq-1",
    name: "Viscaria",
    brand: "Butterfly",
    category: "blade" as const,
    discontinued: 0,
    timestamp: "2024-01-01T00:00:00Z",
    review_count: 10,
  },
  rubber_forehand: {
    id: "eq-2",
    name: "Tenergy 05",
    brand: "Butterfly",
    category: "rubber" as const,
    discontinued: 0,
    timestamp: "2024-01-02T00:00:00Z",
    review_count: 20,
  },
  rubber_backhand: {
    id: "eq-3",
    name: "Rozena",
    brand: "Butterfly",
    category: "rubber" as const,
    discontinued: 0,
    timestamp: "2024-01-03T00:00:00Z",
    review_count: 15,
  },
  total_price_usd: 300,
  reasoning: "Great all-around setup for intermediate players.",
};

const mockPost = vi.fn();

vi.mock("@/config/apiClient", () => ({
  apiClient: {
    post: (...args: unknown[]) => mockPost(...args),
  },
  SESSION_EXPIRED_EVENT: "session-expired",
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useEquipmentRecommend", () => {
  beforeEach(() => {
    queryClient.clear();
    mockPost.mockReset();
  });

  test("submits recommendation request and returns result", async () => {
    mockPost.mockResolvedValueOnce({ data: mockRecommendation });

    const { result } = renderHook(() => useEquipmentRecommend(), { wrapper });

    const request: RecommendRequest = {
      playing_style: "intermediate",
      budget_usd: 300,
      preferred_brands: ["Butterfly"],
    };

    result.current.mutate(request);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockPost).toHaveBeenCalledWith("/equipment/recommend-setup", request);
    expect(result.current.data).toEqual(mockRecommendation);
  });

  test("handles error state", async () => {
    mockPost.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useEquipmentRecommend(), { wrapper });

    const request: RecommendRequest = {
      playing_style: "beginner",
    };

    result.current.mutate(request);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  test("sends minimal request with only playing_style", async () => {
    mockPost.mockResolvedValueOnce({ data: mockRecommendation });

    const { result } = renderHook(() => useEquipmentRecommend(), { wrapper });

    const request: RecommendRequest = {
      playing_style: "attacker",
    };

    result.current.mutate(request);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockPost).toHaveBeenCalledWith("/equipment/recommend-setup", request);
  });
});
