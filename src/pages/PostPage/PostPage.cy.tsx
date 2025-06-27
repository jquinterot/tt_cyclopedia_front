import PostPage from "./PostPage";

describe("<PostPage />", () => {
  it("renders the Post page", () => {
    cy.mount(<PostPage />);
    cy.get("[data-testid='post-page']").should("exist");
  });
}); 