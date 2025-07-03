import React from 'react';
import FormForumComment from './FormCommentSection';

describe('<FormForumComment />', () => {
  it('mounts and displays comment form', () => {
    cy.intercept('GET', '/comments/forum/test-id/main', {
      statusCode: 200,
      body: [
        {
          id: 'comment-1',
          comment: 'Test comment',
          user_id: 'user1',
          username: 'User One',
          likes: 0,
          liked_by_current_user: false,
          timestamp: '2023-01-01T00:00:00Z',
        },
      ],
    }).as('getForumComments');
    cy.mount(
      <FormForumComment forumId="test-id" />
    );
    cy.get('[data-testid="forum-comment-form-container"]').should('exist');
  });
}); 