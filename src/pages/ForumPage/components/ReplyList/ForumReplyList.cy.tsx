import React from 'react';
import { ForumReplyList } from './ForumReplyList';

describe('<ForumReplyList />', () => {
  it('mounts and displays nested comment list', () => {
    cy.intercept('GET', '/comments/forum/forum-id/replies/parent-id', {
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
      <ForumReplyList parentId="parent-id" forumId="forum-id" onDeleteReply={() => {}} />
    );
    cy.get('[data-testid="nested-comment-list"]').should('exist');
  });
}); 