import { render } from "@testing-library/react";
import { CommentItem } from "./CommentItem";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from '@/contexts/AuthContext';

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
      timestamp: "2023-01-01T00:00:00Z",
      liked_by_current_user: false,
      likes: 0
    };

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
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
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  });
}); 