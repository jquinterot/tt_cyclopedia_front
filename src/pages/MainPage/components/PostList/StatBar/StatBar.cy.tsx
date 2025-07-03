import StatBar from './StatBar';
import React from 'react';

describe('<StatBar />', () => {
  it('renders stat bar with correct values', () => {
    cy.mount(<StatBar label="Speed" value={7.5} color="bg-red-500" />);
    
    cy.contains('Speed').should('exist');
    cy.contains('7.5').should('exist');
  });

  it('applies correct color class', () => {
    cy.mount(<StatBar label="Control" value={8.8} color="bg-blue-500" />);
    
    cy.get('.bg-blue-500').should('exist');
  });
}); 