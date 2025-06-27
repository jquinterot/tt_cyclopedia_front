import { render } from "@testing-library/react";
import { ReplyList } from "./ReplyList";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from '@/contexts/AuthContext';

describe("ReplyList", () => {
  it("renders without crashing", () => {
    const queryClient = new QueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <ReplyList
              parentId="parent1"
              postId="post1"
              onDeleteReply={() => {}}
            />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  });
}); 