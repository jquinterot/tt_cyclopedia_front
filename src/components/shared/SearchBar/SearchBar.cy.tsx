import React from 'react';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  it('renders search input', () => {
    cy.mount(<SearchBar value="" onChange={() => {}} placeholder="Search..." testId="search-input" />);
    cy.get('[data-testid="search-input"]').should('exist');
    cy.get('input').should('have.attr', 'placeholder', 'Search...');
  });

  test('renders search icon', () => {
    const mockOnChange = cy.stub().as('onChange');
    cy.mount(<SearchBar value="" onChange={mockOnChange} placeholder="Search..." testId="search-input" />);
    cy.get('[data-testid="search-icon"]').should('exist');
  });

  test('calls onChange when input changes', () => {
    const mockOnChange = cy.stub().as('onChange');
    cy.mount(<SearchBar value="" onChange={mockOnChange} placeholder="Search..." testId="search-input" />);
    cy.get('[data-testid="search-input"]').type('test');
    cy.get('@onChange').should('be.called');
  });

  test('displays the current value', () => {
    const mockOnChange = cy.stub().as('onChange');
    cy.mount(<SearchBar value="current value" onChange={mockOnChange} placeholder="Search..." testId="search-input" />);
    cy.get('[data-testid="search-input"]').should('have.value', 'current value');
  });

  test('applies custom test id', () => {
    const mockOnChange = cy.stub().as('onChange');
    cy.mount(<SearchBar value="" onChange={mockOnChange} placeholder="Search..." testId="custom-test-id" />);
    cy.get('[data-testid="custom-test-id"]').should('exist');
  });
}); 