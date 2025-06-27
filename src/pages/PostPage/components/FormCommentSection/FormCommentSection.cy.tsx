import FormComment from './FormCommentSection';

describe('<FormComment />', () => {
  const mockPostId = '123';

  beforeEach(() => {
    cy.mount(<FormComment postId={mockPostId} />);
  });

  it('renders form elements correctly', () => {
    cy.get('[data-testid="comment-form-container"]').should('be.visible');
    cy.get('[data-testid="comment-form"]').should('be.visible');
    cy.get('[data-testid="comment-input"]').should('be.visible');
  });

  it('valdidates submit button is disabled by default', () => {
    cy.get('[data-testid="comment-input"]').should('be.disabled');
  });
}); 


