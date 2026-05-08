import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CreatePostForm from "./CreatePostForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PropsWithChildren } from "react";

const mockMutateAsync = vi.fn();

vi.mock("@/hooks/posts/usePostPosts", () => ({
  usePostPost: () => ({
    mutateAsync: mockMutateAsync,
    isError: false,
    isPending: false,
  }),
}));

vi.mock("@/hooks/equipment", () => ({
  useEquipment: () => ({
    equipment: [
      { id: "eq-1", name: "Viscaria", brand: "Butterfly", category: "blade" },
      {
        id: "eq-2",
        name: "Tenergy 05",
        brand: "Butterfly",
        category: "rubber",
      },
    ],
    isLoading: false,
    error: null,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

describe("CreatePostForm Equipment Selector", () => {
  beforeEach(() => {
    queryClient.clear();
    mockMutateAsync.mockReset();
    mockMutateAsync.mockResolvedValue({});
  });

  test("renders equipment checkbox", () => {
    render(<CreatePostForm />, { wrapper });

    expect(screen.getByLabelText(/Link to equipment/i)).toBeInTheDocument();
  });

  test("shows equipment dropdown when checkbox is checked", () => {
    render(<CreatePostForm />, { wrapper });

    const checkbox = screen.getByLabelText(/Link to equipment/i);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();

    fireEvent.click(checkbox);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText(/Butterfly Viscaria/i)).toBeInTheDocument();
    expect(screen.getByText(/Butterfly Tenergy 05/i)).toBeInTheDocument();
  });

  test("hides equipment dropdown when checkbox is unchecked", () => {
    render(<CreatePostForm />, { wrapper });

    const checkbox = screen.getByLabelText(/Link to equipment/i);
    fireEvent.click(checkbox);
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  test("includes equipment_id in form data when equipment is selected", async () => {
    render(<CreatePostForm />, { wrapper });

    // Fill required fields
    const titleInput = screen.getByTestId("post-title-input");
    const contentInput = screen.getByTestId("post-content-input");
    fireEvent.change(titleInput, { target: { value: "Test Review" } });
    fireEvent.change(contentInput, { target: { value: "Great equipment!" } });

    // Enable equipment and select one
    const checkbox = screen.getByLabelText(/Link to equipment/i);
    fireEvent.click(checkbox);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "eq-1" } });

    // Submit form
    const form = screen.getByTestId("create-post-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });

    const formData = mockMutateAsync.mock.calls[0][0].formData as FormData;
    expect(formData.get("equipment_id")).toBe("eq-1");
  });

  test("does not include equipment_id when checkbox is unchecked", async () => {
    render(<CreatePostForm />, { wrapper });

    // Fill required fields
    const titleInput = screen.getByTestId("post-title-input");
    const contentInput = screen.getByTestId("post-content-input");
    fireEvent.change(titleInput, { target: { value: "Test Review" } });
    fireEvent.change(contentInput, { target: { value: "Great equipment!" } });

    // Submit without enabling equipment
    const form = screen.getByTestId("create-post-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });

    const formData = mockMutateAsync.mock.calls[0][0].formData as FormData;
    expect(formData.get("equipment_id")).toBeNull();
  });
});
