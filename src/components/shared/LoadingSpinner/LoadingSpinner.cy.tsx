/// <reference types="cypress" />
import LoadingSpinner from './LoadingSpinner';

describe('<LoadingSpinner />', () => {
  it('renders', () => {
    cy.mount(<LoadingSpinner />);
    cy.get('[data-testid="loading-spinner"]').should('exist');
  });
}); 