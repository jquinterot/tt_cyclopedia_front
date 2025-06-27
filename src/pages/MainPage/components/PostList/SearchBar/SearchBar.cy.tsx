import React from 'react';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  it('renders search input', () => {
    const mockOnChange = cy.stub().as('onChange');
    cy.mount(<SearchBar value="" onChange={mockOnChange} />);
    
    cy.get('[data-testid="post-search-input"]').should('exist');
    cy.get('[placeholder="Search posts..."]').should('exist');
  });

  it('calls onChange when input changes', () => {
    const mockOnChange = cy.stub().as('onChange');
    cy.mount(<SearchBar value="" onChange={mockOnChange} />);
    
    cy.get('[data-testid="post-search-input"]').type('test');
    cy.get('@onChange').should('be.called');
  });

  it('displays search icon', () => {
    const mockOnChange = cy.stub().as('onChange');
    cy.mount(<SearchBar value="" onChange={mockOnChange} />);
    
    cy.get('[data-testid="search-icon"]').should('exist');
  });
}); 