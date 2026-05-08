import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useEquipment } from "./useEquipment";

const mockEquipment = [
  {
    id: "eq-1",
    name: "Viscaria",
    brand: "Butterfly",
    category: "blade" as const,
    discontinued: 0,
    timestamp: "2024-01-01T00:00:00Z",
    review_count: 10,
  },
  {
    id: "eq-2",
    name: "Tenergy 05",
    brand: "Butterfly",
    category: "rubber" as const,
    discontinued: 0,
    timestamp: "2024-01-02T00:00:00Z",
    review_count: 20,
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

describe("useEquipment", () => {
  beforeEach(() => {
    queryClient.clear();
    mockGet.mockReset();
  });

  test("fetches all equipment", async () => {
    mockGet.mockResolvedValueOnce({ data: mockEquipment });

    const { result } = renderHook(() => useEquipment(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockGet).toHaveBeenCalledWith("/equipment");
    expect(result.current.equipment).toHaveLength(2);
  });

  test("fetches equipment with category filter", async () => {
    mockGet.mockResolvedValueOnce({ data: [mockEquipment[0]] });

    const { result } = renderHook(() => useEquipment("blade"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockGet).toHaveBeenCalledWith("/equipment?category=blade");
    expect(result.current.equipment).toHaveLength(1);
  });

  test("fetches equipment with brand filter", async () => {
    mockGet.mockResolvedValueOnce({ data: mockEquipment });

    const { result } = renderHook(() => useEquipment(undefined, "Butterfly"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockGet).toHaveBeenCalledWith("/equipment?brand=Butterfly");
  });

  test("fetches equipment with search query", async () => {
    mockGet.mockResolvedValueOnce({ data: [mockEquipment[0]] });

    const { result } = renderHook(() => useEquipment(undefined, undefined, "Viscaria"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockGet).toHaveBeenCalledWith("/equipment?search=Viscaria");
  });

  test("handles error state", async () => {
    mockGet.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useEquipment(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.equipment).toBeUndefined();
  });

  test("returns empty array when no equipment found", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => useEquipment(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.equipment).toEqual([]);
  });
});
