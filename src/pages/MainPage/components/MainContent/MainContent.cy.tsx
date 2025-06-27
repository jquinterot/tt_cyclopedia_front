import React from 'react';
import MainContent from './MainContent';
import { BrowserRouter } from 'react-router-dom';

describe('<MainContent />', () => {
  it('renders main content container', () => {
    cy.mount(
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    );
    cy.get('[data-testid="main-content"]').should('exist');
  });

  it('renders PostList by default', () => {
    cy.mount(
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    );
    cy.get('[data-testid="post-list-container"]').should('exist');
  });

  it('renders custom children when provided', () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    cy.mount(
      <BrowserRouter>
        <MainContent>{customContent}</MainContent>
      </BrowserRouter>
    );
    cy.get('[data-testid="custom-content"]').should('exist');
    cy.get('[data-testid="post-list-container"]').should('not.exist');
  });
}); 