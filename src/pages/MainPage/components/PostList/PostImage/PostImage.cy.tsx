import PostImage from './PostImage';
import React from 'react';

describe('<PostImage />', () => {
  it('renders image with correct attributes', () => {
    cy.mount(<PostImage src="/test.jpg" alt="Test Post" postId="1" />);
    
    cy.get('[data-testid="post-image-1"]')
      .should('have.attr', 'src', '/test.jpg')
      .and('have.attr', 'alt', 'Test Post');
  });

  it('renders image container', () => {
    cy.mount(<PostImage src="/test.jpg" alt="Test Post" postId="1" />);
    
    cy.get('[data-testid="post-image-container-1"]').should('exist');
  });
}); 