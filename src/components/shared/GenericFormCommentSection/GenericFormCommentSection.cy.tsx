import React from 'react';
import GenericFormCommentSection from './GenericFormCommentSection';

describe('<GenericFormCommentSection />', () => {
  it('renders comment form container', () => {
    const mockUseMainComments = cy.stub().returns({
      mainComments: [],
      error: null,
      isLoading: false
    });
    const mockUsePostComment = cy.stub().returns({
      mutateAsync: cy.stub().resolves()
    });
    const mockT = cy.stub().returns('translated text');
    const mockCommentsSectionComponent = cy.stub().returns(<div>Comments Section</div>);

    const mockProps = {
      id: 'test-id',
      useMainComments: mockUseMainComments,
      usePostComment: mockUsePostComment,
      isAuthenticated: true,
      t: mockT,
      testIdPrefix: 'test-',
      CommentsSectionComponent: mockCommentsSectionComponent
    };

    cy.mount(<GenericFormCommentSection {...mockProps} />);
    cy.get('[data-testid="test-comment-form-container"]').should('exist');
  });

  it('renders comment input', () => {
    const mockUseMainComments = cy.stub().returns({
      mainComments: [],
      error: null,
      isLoading: false
    });
    const mockUsePostComment = cy.stub().returns({
      mutateAsync: cy.stub().resolves()
    });
    const mockT = cy.stub().returns('translated text');
    const mockCommentsSectionComponent = cy.stub().returns(<div>Comments Section</div>);

    const mockProps = {
      id: 'test-id',
      useMainComments: mockUseMainComments,
      usePostComment: mockUsePostComment,
      isAuthenticated: true,
      t: mockT,
      testIdPrefix: 'test-',
      CommentsSectionComponent: mockCommentsSectionComponent
    };

    cy.mount(<GenericFormCommentSection {...mockProps} />);
    cy.get('[data-testid="test-comment-input"]').should('exist');
  });

  it('renders submit button when authenticated', () => {
    const mockUseMainComments = cy.stub().returns({
      mainComments: [],
      error: null,
      isLoading: false
    });
    const mockUsePostComment = cy.stub().returns({
      mutateAsync: cy.stub().resolves()
    });
    const mockT = cy.stub().returns('translated text');
    const mockCommentsSectionComponent = cy.stub().returns(<div>Comments Section</div>);

    const mockProps = {
      id: 'test-id',
      useMainComments: mockUseMainComments,
      usePostComment: mockUsePostComment,
      isAuthenticated: true,
      t: mockT,
      testIdPrefix: 'test-',
      CommentsSectionComponent: mockCommentsSectionComponent
    };

    cy.mount(<GenericFormCommentSection {...mockProps} />);
    cy.get('[data-testid="test-submit-comment"]').should('exist');
  });

  it('renders sign in link when not authenticated', () => {
    const mockUseMainComments = cy.stub().returns({
      mainComments: [],
      error: null,
      isLoading: false
    });
    const mockUsePostComment = cy.stub().returns({
      mutateAsync: cy.stub().resolves()
    });
    const mockT = cy.stub().returns('form.comment.signInButton');
    const mockCommentsSectionComponent = cy.stub().returns(<div>Comments Section</div>);

    const mockProps = {
      id: 'test-id',
      useMainComments: mockUseMainComments,
      usePostComment: mockUsePostComment,
      isAuthenticated: false,
      t: mockT,
      testIdPrefix: 'test-',
      CommentsSectionComponent: mockCommentsSectionComponent
    };

    cy.mount(<GenericFormCommentSection {...mockProps} />);
    cy.contains('form.comment.signInButton').should('exist');
  });
}); 