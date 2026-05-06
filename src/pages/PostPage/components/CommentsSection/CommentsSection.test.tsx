import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comments from "./CommentsSection";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from '@/contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

vi.mock('@/hooks/comments/useMainComments', () => ({
  useMainComments: (postId: string) => ({
    mainComments: [
      {
        id: "1",
        comment: "Test comment 1",
        likes: 5,
        user_id: "user1",
        post_id: postId,
        username: "admin",
        timestamp: "2023-10-01T12:00:00Z",
      },
    ],
    isLoading: false,
    error: null,
  }),
}));

vi.mock('@/hooks/comments/useDeleteComment', () => ({
  useDeleteComment: () => ({
    mutateAsync: vi.fn(),
  }),
}));

vi.mock('@/hooks/comments/usePostComments', () => ({
  usePostComment: () => ({
    mutateAsync: vi.fn(),
  }),
}));

vi.mock('@/hooks/comments/useEditComment', () => ({
  useEditComment: () => ({
    mutateAsync: vi.fn(),
  }),
}));

vi.mock('@/hooks/comments/useLikeCommentModern', () => ({
  useLikeCommentModern: vi.fn(() => ({
    likes: 5,
    liked: false,
    handleLike: vi.fn(),
    isProcessing: false,
  })),
}));

vi.mock('@/hooks/comments/useRepliedComments', () => ({
  useReplyComments: () => ({
    comments: [],
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
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {ui}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("Comments Component", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("renders comments list", async () => {
    const { getByText, getByTestId } = renderWithProviders(<Comments postId="post1" />);
    await waitFor(() => {
      expect(getByTestId("comments-list")).toBeInTheDocument();
      expect(getByText("Test comment 1")).toBeInTheDocument();
    });
  });

  test("shows reply button", async () => {
    const { getByText } = renderWithProviders(<Comments postId="post1" />);
    await waitFor(() => {
      expect(getByText("Reply")).toBeInTheDocument();
    });
  });

  test("shows reply form when reply button is clicked", async () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(<Comments postId="post1" />);
    const user = userEvent.setup();

    await waitFor(() => {
      expect(getByText("Reply")).toBeInTheDocument();
    });

    const replyButton = getByText("Reply");
    await user.click(replyButton);

    await waitFor(() => {
      expect(getByPlaceholderText("Write a reply...")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
    });
  });
});
