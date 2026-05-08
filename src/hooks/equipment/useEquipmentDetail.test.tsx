import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useEquipmentDetail } from "./useEquipmentDetail";

const mockEquipmentDetail = {
  id: "eq-1",
  name: "Viscaria",
  brand: "Butterfly",
  category: "blade" as const,
  discontinued: 0,
  timestamp: "2024-01-01T00:00:00Z",
  review_count: 10,
  blade_specs: {
    id: "spec-1",
    equipment_id: "eq-1",
    speed: 85,
    control: 75,
  },
};

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

describe("useEquipmentDetail", () => {
  beforeEach(() => {
    queryClient.clear();
    mockGet.mockReset();
  });

  test("fetches equipment detail by id", async () => {
    mockGet.mockResolvedValueOnce({ data: mockEquipmentDetail });

    const { result } = renderHook(() => useEquipmentDetail("eq-1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockGet).toHaveBeenCalledWith("/equipment/eq-1");
    expect(result.current.equipment).toEqual(mockEquipmentDetail);
  });

  test("does not fetch when equipmentId is empty", async () => {
    const { result } = renderHook(() => useEquipmentDetail(""), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(mockGet).not.toHaveBeenCalled();
  });

  test("handles error state", async () => {
    mockGet.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useEquipmentDetail("eq-1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.equipment).toBeUndefined();
  });

  test("returns undefined when equipment not found", async () => {
    mockGet.mockResolvedValueOnce({ data: null });

    const { result } = renderHook(() => useEquipmentDetail("eq-999"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.equipment).toBeNull();
  });
});
