import CreatePostForm from './CreatePostForm';
import React from 'react';

describe('<CreatePostForm />', () => {
  beforeEach(() => {
    cy.mount(<CreatePostForm />);
  });

  it('renders form elements correctly', () => {
    cy.get('[data-testid="create-post-container"]').should('exist');
    cy.get('[data-testid="create-post-form"]').should('exist');
    cy.get('[data-testid="post-title-input"]').should('exist');
    cy.get('[data-testid="post-content-input"]').should('exist');
    cy.get('[data-testid="image-upload-area"]').should('exist');
    cy.get('[data-testid="image-input"]').should('exist');
  });

  it('handles form input', () => {
    const title = 'Test Post Title';
    const content = 'Test Post Content';

    cy.get('[data-testid="post-title-input"]').type(title);
    cy.get('[data-testid="post-content-input"]').type(content);
    cy.get('[data-testid="post-title-input"]').should('have.value', title);
    cy.get('[data-testid="post-content-input"]').should('have.value', content);
  });

  it('handles form cancellation', () => {
    cy.get('[data-testid="post-title-input"]').type('Test Title');
    cy.get('[data-testid="post-content-input"]').type('Test Content');
    cy.get('[data-testid="cancel-button"]').click();
    cy.get('[data-testid="post-title-input"]').should('have.value', '');
    cy.get('[data-testid="post-content-input"]').should('have.value', '');
  });
});