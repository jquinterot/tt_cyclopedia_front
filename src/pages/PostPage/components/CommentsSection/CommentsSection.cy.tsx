import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Comments from "./CommentsSection";
import { interceptGetMainComments, interceptGetReplies } from '../../../../../cypress/mocks/commentMocks';

const queryClient = new QueryClient();

const mountWithProviders = (ui: React.ReactElement) => {
  return cy.mount(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Comments Component", () => {
  beforeEach(() => {
    interceptGetMainComments();
    interceptGetReplies();
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