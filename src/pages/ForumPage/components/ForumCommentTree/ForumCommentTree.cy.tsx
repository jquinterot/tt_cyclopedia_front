import React from 'react';
import { ForumCommentTree } from './ForumCommentTree';

describe('<ForumCommentTree />', () => {
  it('mounts and displays comment tree', () => {
    cy.intercept('GET', /forums\/test-id\/comments\?parentId=null/, {
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
    cy.intercept('GET', /forums\/test-id\/comments\?parentId=comment-1/, {
      statusCode: 200,
      body: [
        {
          id: 'reply-1',
          comment: 'Test reply',
          user_id: 'user1',
          username: 'User One',
          likes: 0,
          liked_by_current_user: false,
          timestamp: '2023-01-01T00:00:00Z',
        },
      ],
    }).as('getForumCommentReplies');
    cy.mount(
      <ForumCommentTree forumId="test-id" />
    );
    cy.get('[data-testid="forum-comment-tree"]').should('exist');
  });
}); 