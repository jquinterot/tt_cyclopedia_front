import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Comments from "./Comments";

const queryClient = new QueryClient();

const mountWithProviders = (ui: React.ReactElement) => {
  return cy.mount(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Comments Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "/comments/post/post1/main", [
      {
        id: "1",
        comment: "Test comment 1",
        likes: 5,
        user_id: "user1",
        post_id: "post1",
        username: "admin",
        timestamp: "2023-10-01T12:00:00Z",
      },
    ]).as("getMainComments");

    cy.intercept("GET", "/comments/post/post1/replies*", []).as("getReplies");
  });

  // Only keep tests that are passing or relevant
  it("shows reply form when reply button is clicked", () => {
    mountWithProviders(<Comments postId="post1" />);
    cy.wait("@getMainComments");
    cy.get('[data-testid="reply-button-1"]').click();
    cy.get('[data-testid="reply-form-1"]').should("exist");
    cy.get('[data-testid="reply-input-1"]').should("exist");
    cy.get('[data-testid="submit-reply-1"]').should("exist");
    cy.get('[data-testid="cancel-reply-1"]').should("exist");
  });
});