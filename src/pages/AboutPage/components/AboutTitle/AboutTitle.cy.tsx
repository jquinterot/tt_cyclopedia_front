import AboutTitle from "./AboutTitle";
import { LanguageProvider } from "@/contexts/LanguageContext";
import React from 'react';

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