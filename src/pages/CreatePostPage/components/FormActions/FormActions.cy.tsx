import React from "react";
import FormActions from "./FormActions";

describe("<FormActions />", () => {
  it("renders buttons correctly", () => {
    const onCancel = cy.stub().as("onCancel");
    cy.mount(<FormActions onCancel={onCancel} isPending={false} />);

    cy.get('[data-testid="cancel-button"]').should("contain", "Cancel");
    cy.get('[data-testid="submit-button"]').should("contain", "Create Post");
    cy.get('[data-testid="submit-button"]').should("not.be.disabled");
  });

  it("shows loading state when pending", () => {
    const onCancel = cy.stub().as("onCancel");
    cy.mount(<FormActions onCancel={onCancel} isPending={true} />);

    cy.get('[data-testid="submit-button"]').should("contain", "Creating...");
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });
}); 