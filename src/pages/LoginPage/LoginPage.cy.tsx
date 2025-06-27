import React from "react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";

describe("<LoginPage />", () => {
  it("renders the Login page", () => {
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <LoginPage />
        </LanguageProvider>
      </BrowserRouter>
    );
    cy.get("[data-testid='login-page']").should("exist");
  });
}); 