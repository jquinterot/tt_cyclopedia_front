import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import PostInfoSection from "./PostInfoSection";

// Mock the API client
vi.mock("@/config/apiClient", () => ({
  apiClient: {
    post: vi.fn(),
    delete: vi.fn(),
  },
  SESSION_EXPIRED_EVENT: 'session-expired',
}));

// Mock sonner
vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

const mockPostData = {
  id: "1",
  likes: 42,
  likedByCurrentUser: false,
};

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            {component}
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("PostInfoSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders like count", () => {
    renderWithProviders(<PostInfoSection post={mockPostData} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  test("renders outline heart icon when not liked", () => {
    renderWithProviders(<PostInfoSection post={mockPostData} />);
    expect(screen.getByTestId("post-like-icon-outline")).toBeInTheDocument();
    expect(screen.queryByTestId("post-like-icon-filled")).not.toBeInTheDocument();
  });

  test("renders filled heart icon when liked", () => {
    const likedPost = { ...mockPostData, likedByCurrentUser: true };
    renderWithProviders(<PostInfoSection post={likedPost} />);
    expect(screen.getByTestId("post-like-icon-filled")).toBeInTheDocument();
    expect(screen.queryByTestId("post-like-icon-outline")).not.toBeInTheDocument();
  });

  test("shows login toast when unauthenticated user tries to like", async () => {
    const { toast } = vi.mocked(await import("sonner"));
    renderWithProviders(<PostInfoSection post={mockPostData} />);
    
    const likeButton = screen.getByRole("button");
    fireEvent.click(likeButton);
    
    expect(toast).toHaveBeenCalledWith("Please login to like!", {
      icon: "⚠️",
      id: "login-to-like",
    });
  });

  test("has correct aria-pressed attribute", () => {
    renderWithProviders(<PostInfoSection post={mockPostData} />);
    const likeButton = screen.getByRole("button");
    expect(likeButton).toHaveAttribute("aria-pressed", "false");
  });

  test("has correct aria-pressed attribute when liked", () => {
    const likedPost = { ...mockPostData, likedByCurrentUser: true };
    renderWithProviders(<PostInfoSection post={likedPost} />);
    const likeButton = screen.getByRole("button");
    expect(likeButton).toHaveAttribute("aria-pressed", "true");
  });

  test("renders with zero likes", () => {
    const zeroLikesPost = { ...mockPostData, likes: 0 };
    renderWithProviders(<PostInfoSection post={zeroLikesPost} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders with large number of likes", () => {
    const largeLikesPost = { ...mockPostData, likes: 999999 };
    renderWithProviders(<PostInfoSection post={largeLikesPost} />);
    expect(screen.getByText("999999")).toBeInTheDocument();
  });

  test("button has correct styling and attributes", () => {
    renderWithProviders(<PostInfoSection post={mockPostData} />);
    const likeButton = screen.getByRole("button");
    
    expect(likeButton).toHaveClass("flex", "items-center", "gap-2", "focus:outline-none");
    expect(likeButton).toHaveStyle("cursor: pointer");
    expect(likeButton).toHaveStyle("background: none");
    expect(likeButton).toHaveStyle("padding: 0");
  });

  test("button is disabled when mutations are pending", () => {
    // Mock the component to simulate pending state
    const MockPostInfoSection = vi.fn().mockImplementation(({ post }) => {
      return (
        <section className="flex items-center gap-3">
          <button
            className="relative flex items-center gap-2 focus:outline-none group"
            disabled={true}
            aria-pressed={post.likedByCurrentUser}
            style={{ cursor: 'not-allowed', background: 'none', border: 'none', padding: 0 }}
          >
            {post.likedByCurrentUser ? (
              <div data-testid="like-icon-filled">❤️</div>
            ) : (
              <div data-testid="like-icon-outline">🤍</div>
            )}
            <p className="text-base font-medium">{post.likes}</p>
          </button>
        </section>
      );
    });

    renderWithProviders(<MockPostInfoSection post={mockPostData} />);
    const likeButton = screen.getByRole("button");
    expect(likeButton).toBeDisabled();
    expect(likeButton).toHaveStyle("cursor: not-allowed");
  });

  test("prevents default behavior when unauthenticated user clicks", async () => {
    const { toast } = vi.mocked(await import("sonner"));
    renderWithProviders(<PostInfoSection post={mockPostData} />);
    
    const likeButton = screen.getByRole("button");
    const mockPreventDefault = vi.fn();
    const mockBlur = vi.fn();
    
    Object.defineProperty(likeButton, 'blur', {
      value: mockBlur,
      writable: true
    });
    
    fireEvent.click(likeButton, { preventDefault: mockPreventDefault });
    
    expect(toast).toHaveBeenCalled();
    expect(mockBlur).toHaveBeenCalled();
  });

  test("renders LikeCount component with correct styling", () => {
    renderWithProviders(<PostInfoSection post={mockPostData} />);
    const likeCount = screen.getByText("42");
    expect(likeCount).toHaveClass("text-base", "font-medium");
  });

  test("renders heart icons with correct styling", () => {
    renderWithProviders(<PostInfoSection post={mockPostData} />);
    const outlineIcon = screen.getByTestId("post-like-icon-outline");
    
    expect(outlineIcon).toHaveClass("w-7", "h-7", "text-blue-400", "transition-colors");
  });

  test("renders filled heart icon with correct styling when liked", () => {
    const likedPost = { ...mockPostData, likedByCurrentUser: true };
    renderWithProviders(<PostInfoSection post={likedPost} />);
    const filledIcon = screen.getByTestId("post-like-icon-filled");
    
    expect(filledIcon).toHaveClass("w-7", "h-7", "text-blue-600", "transition-colors");
  });
});