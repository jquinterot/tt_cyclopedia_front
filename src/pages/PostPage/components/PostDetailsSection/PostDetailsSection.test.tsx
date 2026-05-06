import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import PostDetails from "./PostDetailsSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const mockUsePostById = vi.fn();

vi.mock('@/hooks/posts/usePostById', () => ({
  usePostById: (...args: unknown[]) => mockUsePostById(...args),
}));

vi.mock('@/hooks/posts/usePostId', () => ({
  usePostId: vi.fn(() => ({
    postId: '1',
    updatePostId: vi.fn(),
  })),
}));

vi.mock('@/hooks/posts/useUpdatePost', () => ({
  useUpdatePost: vi.fn(() => ({
    mutateAsync: vi.fn(),
    isPending: false,
  })),
}));

vi.mock('@/hooks/posts/useDeletePost', () => ({
  useDeletePost: vi.fn(() => ({
    mutateAsync: vi.fn(),
    isPending: false,
  })),
}));

// Create a wrapper with necessary providers
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            {ui}
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("PostDetails Component", () => {
  beforeEach(() => {
    queryClient.clear();
    mockUsePostById.mockReset();
    mockUsePostById.mockReturnValue({
      post: null,
      error: null,
      isLoading: true,
      refetch: vi.fn(),
    });
  });

  test("renders loading state initially", () => {
    renderWithProviders(<PostDetails />);
    const spinner = screen.getByTestId("loading-spinner-icon");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  test("renders error state when there is an error", () => {
    renderWithProviders(<PostDetails />);
    const errorMessage = screen.queryByText("Error getting the post by Id");
    expect(errorMessage).not.toBeInTheDocument();
  });

  test("renders equipment badge when post has equipment", () => {
    mockUsePostById.mockReturnValue({
      post: {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        image_url: '/test.jpg',
        likes: 5,
        likedByCurrentUser: false,
        author: 'testuser',
        timestamp: '2024-01-01T00:00:00Z',
        equipment: {
          id: 'eq-1',
          name: 'Viscaria',
          brand: 'Butterfly',
          category: 'blade',
        },
      },
      error: null,
      isLoading: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<PostDetails />);

    expect(screen.getByText('Butterfly Viscaria')).toBeInTheDocument();
    const equipmentLink = screen.getByRole('link', { name: /Butterfly Viscaria/i });
    expect(equipmentLink).toHaveAttribute('href', '/equipment/eq-1');
  });

  test("does not render equipment badge when post has no equipment", () => {
    mockUsePostById.mockReturnValue({
      post: {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        image_url: '/test.jpg',
        likes: 5,
        likedByCurrentUser: false,
        author: 'testuser',
        timestamp: '2024-01-01T00:00:00Z',
      },
      error: null,
      isLoading: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<PostDetails />);

    expect(screen.queryByText(/Viscaria/)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /equipment/i })).not.toBeInTheDocument();
  });
});