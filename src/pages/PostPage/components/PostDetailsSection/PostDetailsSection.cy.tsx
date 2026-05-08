/// <reference types="cypress" />
import "../../../../../cypress/support/component";
import PostDetails from "./PostDetailsSection";

describe("<PostDetails />", () => {
  it("renders skeleton loading state", () => {
    cy.mount(<PostDetails />);
    cy.get('[data-testid="skeleton-post-detail"]').should("exist");
  });
});
