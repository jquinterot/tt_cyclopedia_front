import React from 'react';
import PostStats from './PostStats';

describe('<PostStats />', () => {
  it('renders stats heading', () => {
    cy.mount(<PostStats />);
    cy.get('[data-testid="stats-heading"]').should('exist');
    cy.contains('Stats').should('exist');
  });

  it('renders all stat bars', () => {
    cy.mount(<PostStats />);
    
    cy.contains('Speed').should('exist');
    cy.contains('Spin').should('exist');
    cy.contains('Control').should('exist');
    cy.contains('Overall').should('exist');
  });
}); 