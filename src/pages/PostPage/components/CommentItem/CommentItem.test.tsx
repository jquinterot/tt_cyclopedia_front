import { render } from "@testing-library/react";
import { CommentItem } from "./CommentItem";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("CommentItem", () => {
  it("renders without crashing", () => {
    const queryClient = new QueryClient();
    const mockComment = {
      id: "1",
      comment: "Test comment",
      user_id: "user1",
      post_id: "post1",
      parent_id: null,
      created_at: "2023-01-01",
      username: "testuser",
      timestamp: "2023-01-01T00:00:00Z"
    };

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CommentItem
            comment={mockComment}
            replyingTo={null}
            replyText={{}}
            setReplyText={() => {}}
            setReplyingTo={() => {}}
            setReplyInputRef={() => () => {}}
            handleReply={() => {}}
            handleDeleteComment={() => {}}
            postId="post1"
            handleDeleteReply={() => {}}
          />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });
}); 