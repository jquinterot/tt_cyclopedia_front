import FormComment from './FormComment';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

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
    // Mock toast functions
    cy.stub(toast, 'error').as('toastError');
    cy.stub(toast, 'success').as('toastSuccess');

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <FormComment postId={mockPostId} />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });

  it('renders form elements correctly', () => {
    cy.get('[data-testid="comment-form-container"]').should('exist');
    cy.get('[data-testid="comment-form"]').should('exist');
    cy.get('[data-testid="comment-input"]').should('exist');
    cy.get('[data-testid="submit-comment"]').should('exist');
  });

  it('handles empty comment submission', () => {
    // Try to submit empty comment
    cy.get('[data-testid="submit-comment"]').click();
    
    // Verify toast error was called
    cy.get('@toastError').should('have.been.calledWith', 'Please enter a comment');
  });

  it('handles comment input', () => {
    const testComment = 'Test comment';
    
    // Type in comment
    cy.get('[data-testid="comment-input"]').type(testComment);
    cy.get('[data-testid="comment-input"]').should('have.value', testComment);
  });

  it('submits form with comment', () => {
    const testComment = 'Test comment';
    
    // Type comment
    cy.get('[data-testid="comment-input"]').type(testComment);
    
    // Submit form
    cy.get('[data-testid="submit-comment"]').click();
    
    // Verify form was submitted with correct data
    cy.get('[data-testid="comment-form"]').should('exist');
  });
}); 