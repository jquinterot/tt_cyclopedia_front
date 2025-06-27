import AboutDescription from "./AboutDescription";
import { LanguageProvider } from "@/contexts/LanguageContext";

describe("<AboutDescription />", () => {
  it("renders the about description", () => {
    cy.mount(
      <LanguageProvider>
        <AboutDescription />
      </LanguageProvider>
    );

    cy.get('[data-testid="about-description"]').should("exist");
  });
}); 