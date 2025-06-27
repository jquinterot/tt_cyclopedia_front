import React from 'react';
import MainPage from './MainPage';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../contexts/LanguageContext';

describe('<MainPage />', () => {
  it('renders complete main page structure', () => {
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <MainPage />
        </LanguageProvider>
      </BrowserRouter>
    );
    
    // Check main page structure
    cy.get('[data-testid="main-page"]').should('exist');
    cy.get('[data-testid="main-content"]').should('exist');
    
    // Check navigation and footer
    cy.get('[data-testid="navbar"]').should('exist');
    cy.get('[data-testid="footer"]').should('exist');
    
    // Check PostList is rendered
    cy.get('[data-testid="post-list-container"]').should('exist');
  });

  it('has proper page layout', () => {
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <MainPage />
        </LanguageProvider>
      </BrowserRouter>
    );
    
    // Check main page has proper styling
    cy.get('[data-testid="main-page"]')
      .should('have.class', 'min-h-screen')
      .and('have.class', 'flex')
      .and('have.class', 'flex-col');
    
    // Check main content has proper styling
    cy.get('[data-testid="main-content"]')
      .should('have.class', 'flex-grow')
      .and('have.class', 'flex')
      .and('have.class', 'justify-center');
  });
}); 