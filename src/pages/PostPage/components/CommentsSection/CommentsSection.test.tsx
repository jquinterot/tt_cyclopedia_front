import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comments from "./CommentsSection";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the useMainComments hook to avoid API calls
vi.mock("../../../../hooks/comments/useMainComments", () => ({
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

// Mock the mutation hooks
vi.mock("../../../../hooks/comments/useDeleteComment", () => ({
  useDeleteComment: () => ({
    mutateAsync: vi.fn(),
  }),
}));

vi.mock("../../../../hooks/comments/usePostComments", () => ({
  usePostComment: () => ({
    mutateAsync: vi.fn(),
  }),
}));

// Mock UserInfo to avoid user API calls
vi.mock("../UserInfo/UserInfo", () => ({
  default: ({ userId }: { userId: string }) => <span data-testid={`user-info-${userId}`}>{userId}</span>,
}));

// Mock useReplyComments to avoid API calls for replies
vi.mock("../../../../hooks/comments/useRepliedComments", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useReplyComments: () => ({
    comments: [],
    isLoading: false,
    error: null,
  }),
}));

// Mock toast to avoid toast notifications in tests
vi.mock("react-hot-toast", () => ({
  default: {
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
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Comments Component", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("renders comments list", async () => {
    const { getByTestId } = renderWithProviders(<Comments postId="post1" />);
    await waitFor(() => {
      expect(getByTestId("comments-list")).toBeInTheDocument();
      expect(getByTestId("comment-1")).toBeInTheDocument();
      expect(getByTestId("comment-text-1")).toHaveTextContent("Test comment 1");
    });
  });

  test("shows reply form when reply button is clicked", async () => {
    const { getByTestId } = renderWithProviders(<Comments postId="post1" />);
    const user = userEvent.setup();

    const replyButton = getByTestId("reply-button-1");
    await user.click(replyButton);

    expect(getByTestId("reply-form-1")).toBeInTheDocument();
    expect(getByTestId("reply-input-1")).toBeInTheDocument();
    expect(getByTestId("submit-reply-1")).toBeInTheDocument();
    expect(getByTestId("cancel-reply-1")).toBeInTheDocument();
  });

  test("hides reply form when cancel is clicked", async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<Comments postId="post1" />);
    const user = userEvent.setup();

    // Open reply form
    await user.click(getByTestId("reply-button-1"));
    expect(getByTestId("reply-form-1")).toBeInTheDocument();

    // Cancel reply
    await user.click(getByTestId("cancel-reply-1"));
    expect(queryByTestId("reply-form-1")).not.toBeInTheDocument();
  });
});