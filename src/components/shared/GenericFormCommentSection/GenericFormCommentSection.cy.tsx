import GenericFormCommentSection from './GenericFormCommentSection';
import { it, describe } from 'vitest';
import React from 'react';

describe('<GenericFormCommentSection />', () => {
  it('renders comment form container', () => {
    const mockUseMainComments = () => ({
      mainComments: [],
      error: null,
      isLoading: false
    });
    const mockUsePostComment = () => ({
      mutateAsync: async () => {}
    });
    const mockT = () => 'translated text';
    const mockCommentsSectionComponent = () => <div>Comments Section</div>;

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
    const mockUseMainComments = () => ({
      mainComments: [],
      error: null,
      isLoading: false
    });
    const mockUsePostComment = () => ({
      mutateAsync: async () => {}
    });
    const mockT = () => 'translated text';
    const mockCommentsSectionComponent = () => <div>Comments Section</div>;

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
    const mockUseMainComments = () => ({
      mainComments: [],
      error: null,
      isLoading: false
    });
    const mockUsePostComment = () => ({
      mutateAsync: async () => {}
    });
    const mockT = () => 'translated text';
    const mockCommentsSectionComponent = () => <div>Comments Section</div>;

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
    const mockUseMainComments = () => ({
      mainComments: [],
      error: null,
      isLoading: false
    });
    const mockUsePostComment = () => ({
      mutateAsync: async () => {}
    });
    const mockT = () => 'form.comment.signInButton';
    const mockCommentsSectionComponent = () => <div>Comments Section</div>;

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