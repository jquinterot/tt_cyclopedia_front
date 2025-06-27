import { render } from "@testing-library/react";
import { ReplyList } from "./ReplyList";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("ReplyList", () => {
  it("renders without crashing", () => {
    const queryClient = new QueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ReplyList
            parentId="parent1"
            postId="post1"
            onDeleteReply={() => {}}
          />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });
}); 