import React from "react";
import SignupPage from "./SignupPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";

describe("<SignupPage />", () => {
  it("renders the Signup page", () => {
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <SignupPage />
        </LanguageProvider>
      </BrowserRouter>
    );
    cy.get("[data-testid='signup-page']").should("exist");
  });
}); 