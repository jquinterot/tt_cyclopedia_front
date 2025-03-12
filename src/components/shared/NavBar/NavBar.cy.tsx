import NavBar from './NavBar';

describe('<NavBar />', () => {
  beforeEach(() => {
    cy.mount(<NavBar />);
  });

  it('renders logo and navigation elements', () => {
    // Verify logo structure
    cy.get('header').should('exist');
    cy.get('a[href="/"]')
      .should('contain', 'TT')
      .and('contain', 'Cyclopedia');

    // Verify desktop navigation
    cy.viewport(1280, 800);
    cy.get('[data-testid="desktop-nav"]').within(() => {
      cy.contains('Home').should('be.visible');
      cy.contains('Create Post').should('be.visible');
      cy.contains('About').should('be.visible');
    });

  });

  it('toggles mobile menu correctly', () => {
    // Open menu
    cy.get('button').click();
    cy.get('#mobile-menu').should('be.visible');
    cy.get('button').should('have.attr', 'aria-expanded', 'true');

    // Verify mobile menu links
    cy.get('#mobile-menu').within(() => {
      cy.contains('Home').should('be.visible');
      cy.contains('Create Post').should('be.visible');
      cy.contains('About').should('be.visible');
    });

    // Close menu
    cy.get('button').click();
    cy.get('#mobile-menu').should('not.exist');
    cy.get('button').should('have.attr', 'aria-expanded', 'false');
  });

  it('updates menu icon correctly', () => {
    // Get initial icon state
    cy.get('button svg path').then(($path) => {
      const initialD = $path.attr('d');
      
      // Open menu
      cy.get('button').click();
      cy.get('button svg path').should(($pathAfterOpen) => {
        expect($pathAfterOpen.attr('d')).not.to.eq(initialD);
      });

      // Close menu
      cy.get('button').click();
      cy.get('button svg path').should(($pathAfterClose) => {
        expect($pathAfterClose.attr('d')).to.eq(initialD);
      });
    });
  });

  it('responds to viewport changes', () => {
    // Mobile view
    cy.viewport(600, 800);
    cy.get('.hidden.sm\\:flex').should('not.be.visible');
    cy.get('[data-testid="mobile-menu-button"]').should('be.visible');

    // Desktop view
    cy.viewport(1280, 800);
    cy.get('.hidden.sm\\:flex').should('be.visible');
    cy.get('[data-testid="mobile-menu-button"]').should('not.be.visible');
  });
});