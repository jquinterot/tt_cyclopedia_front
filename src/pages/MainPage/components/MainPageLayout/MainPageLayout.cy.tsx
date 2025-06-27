import React from 'react';
import MainPageLayout from './MainPageLayout';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../../../contexts/LanguageContext';

describe('<MainPageLayout />', () => {
  it('renders page layout with navigation and footer', () => {
    const content = <div data-testid="page-content">Page Content</div>;
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <MainPageLayout>{content}</MainPageLayout>
        </LanguageProvider>
      </BrowserRouter>
    );
    
    cy.get('[data-testid="main-page"]').should('exist');
    cy.get('[data-testid="navbar"]').should('exist');
    cy.get('[data-testid="footer"]').should('exist');
    cy.get('[data-testid="page-content"]').should('exist');
  });

  it('renders children content', () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <MainPageLayout>{customContent}</MainPageLayout>
        </LanguageProvider>
      </BrowserRouter>
    );
    cy.get('[data-testid="custom-content"]').should('contain', 'Custom Content');
  });
}); 