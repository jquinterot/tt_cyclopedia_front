import LoginPage from "./LoginPage";

describe("<LoginPage />", () => {
  it("renders the Login page", () => {
    cy.mount(<LoginPage />);
    cy.get("[data-testid='login-page']").should("exist");
  });
}); 