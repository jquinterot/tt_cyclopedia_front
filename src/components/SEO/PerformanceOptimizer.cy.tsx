/// <reference types="cypress" />
import PerformanceOptimizer from './PerformanceOptimizer';

describe('<PerformanceOptimizer />', () => {
  it('renders', () => {
    cy.mount(<PerformanceOptimizer />);
  });
}); 