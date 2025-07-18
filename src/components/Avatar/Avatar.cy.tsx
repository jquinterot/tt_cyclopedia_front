import Avatar from "./Avatar";

describe("<Avatar />", () => {
  it("renders default avatar icon", () => {
    cy.mount(<Avatar />);
    cy.get('[data-testid="avatar-fallback"]').should('be.visible');
  });

  it("renders image when src is provided", () => {
    cy.mount(<Avatar src="/test-avatar.jpg" alt="Test User" />);
    cy.get('[data-testid="avatar-image"]').should('be.visible');
    cy.get('[data-testid="avatar-image"]').should('have.attr', 'alt', 'Test User');
  });

  it("applies correct size classes", () => {
    cy.mount(<Avatar size="sm" />);
    cy.get('[data-testid="avatar-fallback"]').should('have.class', 'h-6', 'w-6');

    cy.mount(<Avatar size="md" />);
    cy.get('[data-testid="avatar-fallback"]').should('have.class', 'h-8', 'w-8');

    cy.mount(<Avatar size="lg" />);
    cy.get('[data-testid="avatar-fallback"]').should('have.class', 'h-12', 'w-12');
  });

  it("renders custom fallback icon", () => {
    const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
    cy.mount(<Avatar fallbackIcon={customIcon} />);
    cy.get('[data-testid="custom-icon"]').should('be.visible');
  });
}); 