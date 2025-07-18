import { NestedCommentList } from './NestedCommentList';
import React from 'react';
import { describe, it, expect } from 'vitest';

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
    let called = false;
    const onLikeToggle = () => { called = true; };
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
    cy.get('[data-testid="nested-like-button-1"]').click().then(() => {
      expect(called).to.be.true;
    });
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