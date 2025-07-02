import Footer from './Footer';
import React from 'react';

describe('<Footer />', () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  it('renders footer content correctly', () => {
    // Check main content
    cy.get('[data-testid="footer"]').should('exist');
    cy.get('[data-testid="footer-heading"]').should('contain', 'TT Cyclopedia');
    cy.get('[data-testid="footer-description"]').should('contain', 'Your premier destination for comprehensive blade equipment reviews');
    
    // Check copyright text with dynamic year
    const currentYear = new Date().getFullYear();
    cy.get('[data-testid="footer-copyright"]')
      .should('contain', `© ${currentYear} TT Cyclopedia. All rights reserved.`);
  });

  it('has proper styling', () => {
    // Check footer styling
    cy.get('[data-testid="footer"]')
      .should('have.class', 'bg-slate-900/60')
      .and('have.class', 'backdrop-blur-md')
      .and('have.class', 'text-white')
      .and('have.class', 'mt-auto');

    // Check content section styling
    cy.get('[data-testid="footer-content"]')
      .should('have.class', 'border-t')
      .and('have.class', 'border-white/5')
      .and('have.class', 'bg-slate-900/80');
  });
});