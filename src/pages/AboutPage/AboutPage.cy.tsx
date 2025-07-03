import AboutPage from "./AboutPage";
import React from 'react';

describe("<AboutPage />", () => {
  it("renders the About page", () => {
    cy.mount(<AboutPage />);
    cy.get("[data-testid='about-page']").should("exist");
  });
}); 