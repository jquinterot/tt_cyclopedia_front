/// <reference types="cypress" />
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

describe('<LoadingSpinner />', () => {
  it('renders', () => {
    cy.mount(<LoadingSpinner />);
    cy.get('[data-testid="loading-spinner"]').should('exist');
  });
}); 