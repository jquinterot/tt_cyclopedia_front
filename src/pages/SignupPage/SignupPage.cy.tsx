import React from "react";
import SignupPage from "./SignupPage";

describe("<SignupPage />", () => {
  it("renders the Signup page", () => {
    cy.mount(<SignupPage />);
    cy.get("[data-testid='signup-page']").should("exist");
  });
}); 