import NavBar from './NavBar';
import React from 'react';
import { interceptGetMe, setAuthenticatedUser, clearAuthenticatedUser } from '../../../cypress/mocks/userMocks';

describe('<NavBar />', () => {
  // Helper to mount with all necessary providers
  const mountComponent = (isAuthenticated = false) => {
    if (isAuthenticated) {
      setAuthenticatedUser();
      interceptGetMe();
    } else {
      clearAuthenticatedUser();
    }
    cy.mount(<NavBar />);
  };

  beforeEach(() => {
    // Mount unauthenticated by default for most tests
    mountComponent(false);
  });

  afterEach(() => {
    // Clear local storage after each test to ensure isolation
    clearAuthenticatedUser();
  });

  it('renders logo and navigation elements when unauthenticated', () => {
    cy.get('[data-testid="navbar"]').should('exist');
    cy.get('[data-testid="navbar-logo"]').should('exist');
    cy.get('[data-testid="logo-link"]').within(() => {
      cy.contains('TT').should('exist'); // Or span with sm:inline / sm:hidden
      cy.contains('Cyclopedia').should('exist');
    });

    cy.viewport(1280, 800); // Desktop view
    cy.get('[data-testid="desktop-nav"]').within(() => {
      cy.get('[data-testid="nav-posts"]').should('be.visible');
      cy.get('[data-testid="nav-create-post"]').should('not.exist'); // Not visible when unauthenticated
      cy.get('[data-testid="nav-about"]').should('be.visible');
      cy.get('[data-testid="language-toggle"]').should('be.visible');
      cy.get('[data-testid="nav-login"]').should('be.visible');
      cy.get('[data-testid="user-profile"]').should('not.exist');
    });
  });

  it('renders create post link and user profile when authenticated', () => {
    mountComponent(true); // Mount as authenticated

    cy.viewport(1280, 800); // Desktop view
    cy.get('[data-testid="desktop-nav"]').within(() => {
      cy.get('[data-testid="nav-posts"]').should('be.visible');
      cy.get('[data-testid="nav-about"]').should('be.visible');
      cy.get('[data-testid="language-toggle"]').should('be.visible');
      cy.get('[data-testid="nav-login"]').should('not.exist');
      cy.get('[data-testid="user-profile"]').should('be.visible').within(() => {
        cy.contains('test'); // From setUsername('test')
        cy.get('[data-testid="user-profile-trigger"]').click();
        cy.get('[data-testid="profile-button"]').should('be.visible'); // Checks for logout button presence
      });
    });
  });

  it('toggles mobile menu correctly when unauthenticated', () => {
    cy.viewport(375, 667); // Mobile view
    cy.wait(200); // Allow UI to settle after viewport change

    cy.get('[data-testid="mobile-menu"]').should('not.exist');
    cy.get('button[data-testid="mobile-menu-button"]').first().click(); // Ensure to click the correct button
    cy.get('[data-testid="mobile-menu"]').should('be.visible').within(() => {
      cy.get('[data-testid="mobile-nav-posts"]').should('be.visible');
      cy.get('[data-testid="mobile-nav-create-post"]').should('not.exist'); // Not visible
      cy.get('[data-testid="mobile-nav-about"]').should('be.visible');
      cy.get('[data-testid="mobile-language-toggle"]').should('be.visible');
      cy.get('[data-testid="mobile-nav-login"]').should('be.visible');
    });

    cy.get('button[data-testid="mobile-menu-button"]').first().click();
    cy.get('[data-testid="mobile-menu"]').should('not.exist');
  });

  it('toggles mobile menu correctly when authenticated', () => {
    mountComponent(true); // Mount as authenticated
    cy.viewport(375, 667); // Mobile view
    cy.wait(200);

    cy.get('[data-testid="mobile-menu"]').should('not.exist');
    cy.get('button[data-testid="mobile-menu-button"]').first().click();
    cy.get('[data-testid="mobile-menu"]').should('be.visible').within(() => {
      cy.get('[data-testid="mobile-nav-posts"]').should('be.visible');
      cy.get('[data-testid="mobile-nav-create-post"]').should('not.exist');
      cy.get('[data-testid="mobile-nav-about"]').should('be.visible');
      cy.get('[data-testid="mobile-language-toggle"]').should('be.visible');
      cy.get('[data-testid="mobile-nav-login"]').should('not.exist');
      cy.get('[data-testid="mobile-username"]').should('contain', 'test'); // Username in mobile menu
      // Check for logout button (assuming it uses the t() function or has static text)
      // cy.contains(t('nav.logout')) or a data-testid for the button itself
    });

    cy.get('button[data-testid="mobile-menu-button"]').first().click();
    cy.get('[data-testid="mobile-menu"]').should('not.exist');
  });

  it('handles logout correctly', () => {
    mountComponent(true); // Start as authenticated

    cy.viewport(1280, 800); // Desktop
    cy.get('[data-testid="user-profile"]').should('be.visible');
    cy.get('[data-testid="user-profile-trigger"]').click();
    cy.get('[data-testid="profile-button"]').click();

    // After logout
    cy.get('[data-testid="user-profile"]').should('not.exist');
    cy.get('[data-testid="nav-login"]').should('be.visible');
    cy.get('[data-testid="nav-create-post"]').should('not.exist');

    // Verify in localStorage (optional, but good for sanity check)
    cy.window().its('localStorage.isAuthenticated').should('not.exist');
  });

  it('toggles language', () => {
    cy.viewport(1280, 800); // Desktop

    // Assuming default language is 'en' and t('nav.home') renders 'Home' (or some English text)
    // And t('nav.signIn') renders 'Sign In' (or some English text)
    // This part is highly dependent on your i18n setup.
    // For a robust test, you might mock `useLanguage` or check for specific key rendering.

    let initialLanguageText: string | undefined;
    cy.get('[data-testid="language-toggle"]').invoke('text').then(text => {
      initialLanguageText = text.trim(); // e.g., "EN"
      expect(['EN', 'ES']).to.include(initialLanguageText);

      cy.get('[data-testid="language-toggle"]').click();
      cy.get('[data-testid="language-toggle"]').should('not.contain', initialLanguageText);
      if (initialLanguageText === 'EN') {
        cy.get('[data-testid="language-toggle"]').should('contain', 'ES');
        // Add assertions for text changing if your `t` function updates immediately
        // For example: cy.get('[data-testid="nav-home"]').should('contain', 'Inicio');
      } else {
        cy.get('[data-testid="language-toggle"]').should('contain', 'EN');
        // cy.get('[data-testid="nav-home"]').should('contain', 'Home');
      }

      // Toggle back
      cy.get('[data-testid="language-toggle"]').click();
      cy.get('[data-testid="language-toggle"]').should('contain', initialLanguageText);
    });
  });
});