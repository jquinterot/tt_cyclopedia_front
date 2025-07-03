import MainContent from './MainContent';
import React from 'react';

beforeEach(() => {
  cy.intercept('GET', '/posts', {
    statusCode: 200,
    body: [
      { id: '1', title: 'Test Post', content: 'Test content' },
      // ...add more mock posts as needed
    ],
  }).as('getPosts');

  cy.intercept('GET', '/comments?postId=123', {
    statusCode: 200,
    body: [],
  }).as('getComments');
});

describe('<MainContent />', () => {
  it('renders main content container', () => {
    cy.mount(<MainContent />);
    cy.get('[data-testid="main-content"]').should('exist');
  });

  it('renders PostList by default', () => {
    cy.mount(<MainContent />);
    cy.get('[data-testid="post-list-container"]').should('exist');
  });

  it('renders custom children when provided', () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    cy.mount(<MainContent>{customContent}</MainContent>);
    cy.get('[data-testid="custom-content"]').should('exist');
    cy.get('[data-testid="post-list-container"]').should('not.exist');
  });
}); 