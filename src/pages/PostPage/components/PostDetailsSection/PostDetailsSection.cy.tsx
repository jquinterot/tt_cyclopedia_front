/// <reference types="cypress" />
import '../../../../../cypress/support/component';
import PostDetails from './PostDetailsSection';

describe('<PostDetails />', () => {
  it('renders container', () => {
    cy.mount(<PostDetails />);
    cy.get('.flex.justify-center.items-center').should('exist');
  });

  it('renders loading spinner', () => {
    cy.mount(<PostDetails />);
    cy.get('.animate-spin').should('exist');
    cy.get('.border-t-2.border-b-2.border-blue-500').should('exist');
  });
}); 