import React from "react";
import PostList from "./PostList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

describe("<PostList />", () => {
  const queryClient = new QueryClient();

  it("renders the post list container", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PostList />
        </BrowserRouter>
      </QueryClientProvider>
    );
    cy.get("[data-testid='post-list-container']").should("exist");
  });
}); 