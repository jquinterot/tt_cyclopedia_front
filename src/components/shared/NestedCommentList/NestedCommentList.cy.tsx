import React from 'react';
import { NestedCommentList } from './NestedCommentList';

const mockReply = {
  id: '1',
  comment: 'Test reply',
  user_id: 'user1',
  username: 'testuser',
  likes: 5,
  liked_by_current_user: false,
  timestamp: '2023-01-01T00:00:00Z',
};

describe('<NestedCommentList />', () => {
  it('renders nested comment list', () => {
    cy.mount(
      <NestedCommentList 
        replies={[mockReply]} 
        parentId="parent1"
        renderUserInfo={() => <span>User</span>}
        onLikeToggle={() => {}} 
        onDeleteReply={() => {}} 
        onEdit={async () => {}} 
      />
    );
    cy.get('[data-testid="nested-comment-list"]').should('exist');
  });

  it('renders individual comment', () => {
    cy.mount(
      <NestedCommentList 
        replies={[mockReply]} 
        parentId="parent1"
        renderUserInfo={() => <span>User</span>}
        onLikeToggle={() => {}} 
        onDeleteReply={() => {}} 
        onEdit={async () => {}} 
      />
    );
    cy.contains('Test reply').should('exist');
  });

  it('displays comment text', () => {
    cy.mount(
      <NestedCommentList 
        replies={[mockReply]} 
        parentId="parent1"
        renderUserInfo={() => <span>User</span>}
        onLikeToggle={() => {}} 
        onDeleteReply={() => {}} 
        onEdit={async () => {}} 
      />
    );
    cy.contains('Test reply').should('exist');
  });

  it('calls onLikeToggle when like button is clicked', () => {
    const onLikeToggle = cy.stub().as('onLikeToggle');
    cy.mount(
      <NestedCommentList 
        replies={[mockReply]} 
        parentId="parent1"
        renderUserInfo={() => <span>User</span>}
        onLikeToggle={onLikeToggle} 
        onDeleteReply={() => {}} 
        onEdit={async () => {}} 
      />
    );
    cy.get('[data-testid="nested-like-button-1"]').click();
    cy.get('@onLikeToggle').should('have.been.called');
  });

  it('returns null when no replies', () => {
    cy.mount(
      <NestedCommentList 
        replies={[]} 
        parentId="parent1"
        renderUserInfo={() => <span>User</span>}
        onLikeToggle={() => {}} 
        onDeleteReply={() => {}} 
        onEdit={async () => {}} 
      />
    );
    cy.get('[data-testid="nested-comment-list"]').should('not.exist');
  });
}); 