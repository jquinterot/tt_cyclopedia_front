import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';

describe('<NavBar />', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });

  it('renders logo and navigation elements', () => {
    // Verify logo structure
    cy.get('[data-testid="navbar"]').should('exist');
    cy.get('[data-testid="navbar-logo"]').should('exist');
    cy.get('[data-testid="logo-link"]').within(() => {
      cy.contains('TT').should('exist');
      cy.contains('Cyclopedia').should('exist');
    });

    // Verify desktop navigation
    cy.viewport(1280, 800);
    cy.get('[data-testid="desktop-nav"]').within(() => {
      cy.get('[data-testid="nav-home"]').should('be.visible');
      cy.get('[data-testid="nav-create-post"]').should('be.visible');
      cy.get('[data-testid="nav-about"]').should('be.visible');
    });
  });

  it('toggles mobile menu correctly', () => {
    // Set viewport and wait for it to take effect
    cy.viewport(375, 667); // iPhone SE viewport
    cy.wait(500); // Wait longer for viewport change to take effect
    
    // Initial state - menu should be closed
    cy.get('[data-testid="mobile-menu"]').should('not.exist');
    
    // Open menu - use button[data-testid] to be more specific
    cy.get('button[data-testid="mobile-menu-button"]').click();
    cy.get('[data-testid="mobile-menu"]').should('be.visible');
    
    // Verify mobile menu links
    cy.get('[data-testid="mobile-nav-home"]').should('be.visible');
    cy.get('[data-testid="mobile-nav-create-post"]').should('be.visible');
    cy.get('[data-testid="mobile-nav-about"]').should('be.visible');
    
    // Close menu
    cy.get('button[data-testid="mobile-menu-button"]').click();
    cy.get('[data-testid="mobile-menu"]').should('not.exist');
  });

  it('handles user authentication state', () => {
    // Test unauthenticated state
    cy.get('[data-testid="user-profile"]').should('not.exist');
    cy.contains('Login').should('be.visible');

    // Test authenticated state
    cy.window().then((win) => {
      win.localStorage.setItem('isAuthenticated', 'true');
      cy.mount(
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      );
    });

    cy.get('[data-testid="user-profile"]').should('be.visible');
    cy.get('[data-testid="profile-button"]').should('be.visible').and('contain', 'Logout');
  });
});