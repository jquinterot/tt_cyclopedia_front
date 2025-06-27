/// <reference types="cypress" />
import MainPageLayout from './MainPageLayout';

describe('<MainPageLayout />', () => {
  it('renders page layout with navigation and footer', () => {
    const content = <div data-testid="page-content">Page Content</div>;
    cy.mount(<MainPageLayout>{content}</MainPageLayout>);
    cy.get('[data-testid="main-page"]').should('exist');
    cy.get('[data-testid="navbar"]').should('exist');
    cy.get('[data-testid="footer"]').should('exist');
    cy.get('[data-testid="page-content"]').should('exist');
  });

  it('renders children content', () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    cy.mount(<MainPageLayout>{customContent}</MainPageLayout>);
    cy.get('[data-testid="custom-content"]').should('contain', 'Custom Content');
  });
}); 