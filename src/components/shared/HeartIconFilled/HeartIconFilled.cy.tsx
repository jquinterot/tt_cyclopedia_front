/// <reference types="cypress" />
import React from 'react';
import HeartIconFilled from './HeartIconFilled';
import { describe, it } from 'vitest';

describe('<HeartIconFilled />', () => {
  it('renders filled heart icon with correct test id', () => {
    cy.mount(<HeartIconFilled />);
    cy.get('[data-testid="heart-icon-filled"]').should('exist');
  });

  it('applies custom className', () => {
    cy.mount(<HeartIconFilled className="custom-class" />);
    cy.get('[data-testid="heart-icon-filled"]').should('have.class', 'custom-class');
  });

  it('passes through additional props', () => {
    cy.mount(<HeartIconFilled data-custom="test" />);
    cy.get('[data-testid="heart-icon-filled"]').should('have.attr', 'data-custom', 'test');
  });
}); 