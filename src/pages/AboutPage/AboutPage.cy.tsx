import AboutPage from "./AboutPage";

describe("<AboutPage />", () => {
  it("renders the About page", () => {
    cy.mount(<AboutPage />);
    cy.get("[data-testid='about-page']").should("exist");
  });
}); 