import MissionSection from "./MissionSection";
import { LanguageProvider } from "@/contexts/LanguageContext";

describe("<MissionSection />", () => {
  it("renders the mission section", () => {
    cy.mount(
      <LanguageProvider>
        <MissionSection />
      </LanguageProvider>
    );

    cy.get('[data-testid="mission-title"]').should("exist");
    cy.get('[data-testid="mission-list"]').should("exist");
  });
}); 