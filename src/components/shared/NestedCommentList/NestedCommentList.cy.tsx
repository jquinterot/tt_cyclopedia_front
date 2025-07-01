import React from 'react';
import { NestedCommentList } from './NestedCommentList';

describe('<NestedCommentList />', () => {
  it('renders nested comment list', () => {
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
    cy.get('[data-testid="nested-comment-list"]').should('exist');
  });

  it('renders individual comment', () => {
    const mockProps = {
      replies: [mockReply],
      parentId: 'parent1',
      onDeleteReply: cy.stub().as('onDeleteReply'),
      onLikeToggle: cy.stub().as('onLikeToggle'),
      onEdit: cy.stub().as('onEdit'),
      renderUserInfo: cy.stub().returns(<div>User Info</div>),
      isLikePending: false,
      isEditPending: false
    };

    cy.mount(<NestedCommentList {...mockProps} />);
    cy.get('[data-testid="nested-comment-1"]').should('exist');
  });

  it('displays comment text', () => {
    const mockProps = {
      replies: [mockReply],
      parentId: 'parent1',
      onDeleteReply: cy.stub().as('onDeleteReply'),
      onLikeToggle: cy.stub().as('onLikeToggle'),
      onEdit: cy.stub().as('onEdit'),
      renderUserInfo: cy.stub().returns(<div>User Info</div>),
      isLikePending: false,
      isEditPending: false
    };

    cy.mount(<NestedCommentList {...mockProps} />);
    cy.get('[data-testid="nested-comment-text-1"]').should('contain', 'Test reply');
  });

  it('calls onLikeToggle when like button is clicked', () => {
    const mockProps = {
      replies: [mockReply],
      parentId: 'parent1',
      onDeleteReply: cy.stub().as('onDeleteReply'),
      onLikeToggle: cy.stub().as('onLikeToggle'),
      onEdit: cy.stub().as('onEdit'),
      renderUserInfo: cy.stub().returns(<div>User Info</div>),
      isLikePending: false,
      isEditPending: false
    };

    cy.mount(<NestedCommentList {...mockProps} />);
    cy.get('[data-testid="nested-like-button-1"]').click();
    cy.get('@onLikeToggle').should('be.called');
  });

  it('returns null when no replies', () => {
    const mockProps = {
      replies: [],
      parentId: 'parent1',
      onDeleteReply: cy.stub().as('onDeleteReply'),
      onLikeToggle: cy.stub().as('onLikeToggle'),
      onEdit: cy.stub().as('onEdit'),
      renderUserInfo: cy.stub().returns(<div>User Info</div>),
      isLikePending: false,
      isEditPending: false
    };

    cy.mount(<NestedCommentList {...mockProps} />);
    cy.get('[data-testid="nested-comments-list"]').should('not.exist');
  });
}); 