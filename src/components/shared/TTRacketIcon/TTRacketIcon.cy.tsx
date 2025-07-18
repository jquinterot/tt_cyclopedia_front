import TTRacketIcon from './TTRacketIcon';
/// <reference types="cypress" />

describe('<TTRacketIcon />', () => {
  it('renders TT racket icon with correct test id', () => {
    cy.mount(<TTRacketIcon data-testid="tt-racket-icon" />);
    cy.get('[data-testid="tt-racket-icon"]').should('exist');
  });

  it('applies custom className', () => {
    cy.mount(<TTRacketIcon className="custom-class" />);
    cy.get('[data-testid="tt-racket-icon"]').should('have.class', 'custom-class');
  });

  it('uses default className when not provided', () => {
    cy.mount(<TTRacketIcon />);
    cy.get('[data-testid="tt-racket-icon"]').should('have.class', 'w-6').and('have.class', 'h-6');
  });
}); 