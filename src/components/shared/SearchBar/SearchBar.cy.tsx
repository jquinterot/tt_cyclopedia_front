import React from 'react';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  it('renders search input', () => {
    cy.mount(<SearchBar onSearch={() => {}} placeholder="Search..." />);
    cy.get('[data-testid="search-input"]').should('exist');
    cy.get('input').should('have.attr', 'placeholder', 'Search...');
  });

  it('renders search button', () => {
    const mockOnSearch = cy.stub().as('onSearch');
    cy.mount(<SearchBar onSearch={mockOnSearch} placeholder="Search..." />);
    cy.get('[data-testid="search-button"]').should('exist');
  });

  it('calls onSearch when input changes', () => {
    const mockOnSearch = cy.stub().as('onSearch');
    cy.mount(<SearchBar onSearch={mockOnSearch} placeholder="Search..." />);
    cy.get('[data-testid="search-input"]').type('test');
    // Wait for debounce
    cy.wait(600);
    cy.get('@onSearch').should('be.called');
  });

  it('displays the current value', () => {
    const mockOnSearch = cy.stub().as('onSearch');
    cy.mount(<SearchBar onSearch={mockOnSearch} placeholder="Search..." />);
    cy.get('[data-testid="search-input"]').type('current value');
    cy.get('[data-testid="search-input"]').should('have.value', 'current value');
  });

  it('applies custom className', () => {
    const mockOnSearch = cy.stub().as('onSearch');
    cy.mount(<SearchBar onSearch={mockOnSearch} placeholder="Search..." className="custom-class" />);
    cy.get('[data-testid="search-form"]').should('have.class', 'custom-class');
  });
}); 