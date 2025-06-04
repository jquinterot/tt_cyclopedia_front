import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Comments from "./Comments";
import '@testing-library/jest-dom/vitest';
import type { Comment } from "../../../types/Comment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockComments: Comment[] = [
  {
    id: "1",
    comment: "Test comment 1",
    likes: 5,
    user_id: "user1",
    post_id: "post1"
  }
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe("Comments Component", () => {
  test("renders comments list", () => {
    const { getByTestId } = renderWithProviders(<Comments comments={mockComments} postId="post1" />);
    
    expect(getByTestId("comments-list")).toBeInTheDocument();
    expect(getByTestId("comment-1")).toBeInTheDocument();
    expect(getByTestId("comment-text-1")).toHaveTextContent("Test comment 1");
    expect(getByTestId("likes-count-1")).toHaveTextContent("5");
  });

  test("shows reply form when reply button is clicked", async () => {
    const { getByTestId } = renderWithProviders(<Comments comments={mockComments} postId="post1" />);
    const user = userEvent.setup();
    
    const replyButton = getByTestId("reply-button-1");
    await user.click(replyButton);
    
    expect(getByTestId("reply-form-1")).toBeInTheDocument();
    expect(getByTestId("reply-input-1")).toBeInTheDocument();
    expect(getByTestId("submit-reply-1")).toBeInTheDocument();
    expect(getByTestId("cancel-reply-1")).toBeInTheDocument();
  });

  test("hides reply form when cancel is clicked", async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<Comments comments={mockComments} postId="post1" />);
    const user = userEvent.setup();
    
    // Open reply form
    await user.click(getByTestId("reply-button-1"));
    expect(getByTestId("reply-form-1")).toBeInTheDocument();
    
    // Cancel reply
    await user.click(getByTestId("cancel-reply-1"));
    expect(queryByTestId("reply-form-1")).not.toBeInTheDocument();
  });
});