import HeartIcon from './HeartIcon';
import { describe, it } from "vitest";
import React from 'react';

describe('<HeartIcon />', () => {
  it('renders heart icon with correct test id', () => {
    cy.mount(<HeartIcon data-testid="heart-icon" />);
    cy.get('[data-testid="heart-icon"]').should('exist');
  });

  it('applies custom className', () => {
    cy.mount(<HeartIcon className="custom-class" />);
    cy.get('[data-testid="heart-icon"]').should('have.class', 'custom-class');
  });

  it('passes through additional props', () => {
    cy.mount(<HeartIcon data-custom="test" />);
    cy.get('[data-testid="heart-icon"]').should('have.attr', 'data-custom', 'test');
  });
}); 