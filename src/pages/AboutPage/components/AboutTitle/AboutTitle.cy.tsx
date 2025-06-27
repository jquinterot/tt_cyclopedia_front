import React from "react";
import AboutTitle from "./AboutTitle";
import { LanguageProvider } from "../../../../contexts/LanguageContext";

describe("<AboutTitle />", () => {
  it("renders the about title", () => {
    cy.mount(
      <LanguageProvider>
        <AboutTitle />
      </LanguageProvider>
    );

    cy.get('[data-testid="about-title"]').should("exist");
  });
}); 