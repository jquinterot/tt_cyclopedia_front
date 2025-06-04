import FormComment from './FormComment';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('<FormComment />', () => {
  const mockPostId = '123';

  // Create a new client for each test
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // Disable network requests
        enabled: false
      },
      mutations: {
        retry: false
      }
    }
  });

  beforeEach(() => {
    // Reset query client before each test
    queryClient.clear();

    // Set initial data to avoid loading state
    queryClient.setQueryData(['comments', mockPostId], []);

    // Mock API response
    cy.intercept('POST', '/comments', {
      statusCode: 200,
      body: { id: '1', comment: 'Test comment' }
    }).as('postComment');

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
    cy.get('[data-testid="submit-comment"]').click();
    cy.get('[data-testid="comment-input"]').should('have.value', '');
  });

  it('handles comment input correctly', () => {
    const testComment = 'Test comment';
    cy.get('[data-testid="comment-input"]')
      .type(testComment)
      .should('have.value', testComment);
  });

  it('submits form with valid comment', () => {
    const testComment = 'Test comment';
    cy.get('[data-testid="comment-input"]')
      .type(testComment);
    cy.get('[data-testid="submit-comment"]').click();
  });
}); 