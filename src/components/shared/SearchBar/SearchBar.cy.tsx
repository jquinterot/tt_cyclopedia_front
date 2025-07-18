import SearchBar from './SearchBar';
/// <reference types="cypress" />

describe('<SearchBar />', () => {
  it('renders search input', () => {
    cy.mount(<SearchBar onSearch={() => {}} placeholder="Search..." />);
    cy.get('[data-testid="search-input"]').should('exist');
    cy.get('input').should('have.attr', 'placeholder', 'Search...');
  });

  it('renders search button', () => {
    const mockOnSearch = () => {};
    cy.mount(<SearchBar onSearch={mockOnSearch} placeholder="Search..." />);
    cy.get('[data-testid="search-button"]').should('exist');
  });

  it('calls onSearch when input changes', () => {
    let called = false;
    const mockOnSearch = () => { called = true; };
    cy.mount(<SearchBar onSearch={mockOnSearch} placeholder="Search..." />);
    cy.get('[data-testid="search-input"]').type('test');
    // Wait for debounce
    cy.wait(600);
    cy.then(() => {
      expect(called).to.be.true;
    });
  });

  it('displays the current value', () => {
    const mockOnSearch = () => {};
    cy.mount(<SearchBar onSearch={mockOnSearch} placeholder="Search..." />);
    cy.get('[data-testid="search-input"]').type('current value');
    cy.get('[data-testid="search-input"]').should('have.value', 'current value');
  });

  it('applies custom className', () => {
    const mockOnSearch = () => {};
    cy.mount(<SearchBar onSearch={mockOnSearch} placeholder="Search..." className="custom-class" />);
    cy.get('[data-testid="search-form"]').should('have.class', 'custom-class');
  });
}); 