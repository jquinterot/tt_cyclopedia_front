import React from "react";
import AboutPage from "./About";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";

describe("<AboutPage />", () => {
  it("renders the About page", () => {
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <AboutPage />
        </LanguageProvider>
      </BrowserRouter>
    );
    cy.get("[data-testid='about-page']").should("exist");
  });
}); 