/// <reference types="cypress" />
import React from 'react';
import PerformanceOptimizer from './PerformanceOptimizer';

describe('<PerformanceOptimizer />', () => {
  it('renders', () => {
    cy.mount(<PerformanceOptimizer />);
  });
}); 