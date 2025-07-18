import FeaturesSection from "./FeaturesSection";
import { LanguageProvider } from "@/contexts/LanguageContext";

describe("<FeaturesSection />", () => {
  it("renders the features section", () => {
    cy.mount(
      <LanguageProvider>
        <FeaturesSection />
      </LanguageProvider>
    );

    cy.get('[data-testid="features-title"]').should("exist");
    cy.get('[data-testid="features-grid"]').should("exist");
    cy.get('[data-testid="feature-reviews"]').should("exist");
    cy.get('[data-testid="feature-community"]').should("exist");
  });
}); 