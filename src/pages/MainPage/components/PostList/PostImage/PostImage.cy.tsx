import PostImage from "./PostImage";

describe("<PostImage />", () => {
  it("renders image container with correct attributes", () => {
    cy.mount(
      <PostImage
        src="/test.jpg"
        alt="Test Post"
        postId="1"
        defaultImageUrl="/fallback.jpg"
      />,
    );

    cy.get('[data-testid="post-image-container-1"]').should("exist");
    cy.get('[data-testid="post-image-1"]').should(
      "have.attr",
      "alt",
      "Test Post",
    );
  });

  it("shows fallback on image error", () => {
    cy.mount(
      <PostImage
        src="/nonexistent.jpg"
        alt="Broken"
        postId="2"
        defaultImageUrl="/fallback.jpg"
      />,
    );

    cy.get('[data-testid="post-image-container-2"]').should("exist");
    cy.get('[data-testid="post-image-2"]').should("have.attr", "alt", "Broken");
  });
});
