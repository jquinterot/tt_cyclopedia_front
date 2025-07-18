import LoginPage from "./LoginPage";
import React from 'react';
import { describe, it } from "vitest";


describe("<LoginPage />", () => {
  it("renders the Login page", () => {
    cy.mount(<LoginPage />);
    cy.get("[data-testid='login-page']").should("exist");
  });
}); 