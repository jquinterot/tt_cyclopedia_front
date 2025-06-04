import FormComment from './FormComment';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('<FormComment />', () => {
  const mockPostId = '123';

  // Create a new client for each test
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  beforeEach(() => {
    // Reset query client before each test
    queryClient.clear();

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FormComment postId={mockPostId} />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });

  it('renders form elements correctly', () => {
    // Check form structure
    cy.get('[data-testid="comment-form-container"]').should('be.visible');
    cy.get('[data-testid="comment-form"]').should('be.visible');
    cy.get('[data-testid="comment-input"]').should('be.visible');
    cy.get('[data-testid="submit-comment"]').should('be.visible');
  });

  it('validates empty comment submission', () => {
    // Submit empty form
    cy.get('[data-testid="comment-form"]').submit();
    
    // Form should still be visible after failed submission
    cy.get('[data-testid="comment-form"]').should('be.visible');
    cy.get('[data-testid="comment-input"]').should('have.value', '');
  });

  it('handles comment input correctly', () => {
    const testComment = 'Test comment';
    
    // Type in comment and verify value
    cy.get('[data-testid="comment-input"]')
      .should('be.visible')
      .type(testComment)
      .should('have.value', testComment);
  });

  it('submits form with valid comment', () => {
    const testComment = 'Test comment';
    
    // Type comment
    cy.get('[data-testid="comment-input"]')
      .should('be.visible')
      .type(testComment);
    
    // Submit form
    cy.get('[data-testid="comment-form"]')
      .should('be.visible')
      .submit();
    
    // Form should still exist after submission
    cy.get('[data-testid="comment-form"]').should('exist');
    cy.get('[data-testid="comment-input"]').should('exist');
  });
}); 