import Comments from './Comments';
import { BrowserRouter } from 'react-router-dom';
import { Comment } from '../../../types/Comment';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('<Comments />', () => {
  const mockComments: Comment[] = [
    { id: '1', comment: 'Test comment 1', user_id: 'user1', post_id: '123', likes: 5 },
    { id: '2', comment: 'Test comment 2', user_id: 'user2', post_id: '123', likes: 3 }
  ];

  // Create a new client for each test
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  beforeEach(() => {
    // Mount with required providers
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
          <Comments comments={mockComments} postId="123" />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });

  it('renders comments list correctly', () => {
    cy.get('[data-testid="comments-list"]').should('exist');
    cy.get('[data-testid="comment-1"]').should('exist');
    cy.get('[data-testid="comment-2"]').should('exist');
  });

  it('displays comment text and likes', () => {
    // Check first comment
    cy.get('[data-testid="comment-text-1"]').should('contain', 'Test comment 1');
    cy.get('[data-testid="likes-count-1"]').should('contain', '5');

    // Check second comment
    cy.get('[data-testid="comment-text-2"]').should('contain', 'Test comment 2');
    cy.get('[data-testid="likes-count-2"]').should('contain', '3');
  });

  it('shows reply form when reply button is clicked', () => {
    // Initially, reply form should not be visible
    cy.get('[data-testid="reply-form-1"]').should('not.exist');

    // Click reply button
    cy.get('[data-testid="reply-button-1"]').click();

    // Reply form should be visible
    cy.get('[data-testid="reply-form-1"]').should('be.visible');
    cy.get('[data-testid="reply-input-1"]').should('be.visible');
    cy.get('[data-testid="submit-reply-1"]').should('be.visible');
    cy.get('[data-testid="cancel-reply-1"]').should('be.visible');
  });

  it('hides reply form when cancel is clicked', () => {
    // Open reply form
    cy.get('[data-testid="reply-button-1"]').click();
    cy.get('[data-testid="reply-form-1"]').should('be.visible');

    // Click cancel
    cy.get('[data-testid="cancel-reply-1"]').click();

    // Reply form should be hidden
    cy.get('[data-testid="reply-form-1"]').should('not.exist');
  });

  it('handles empty reply submission', () => {
    // Open reply form
    cy.get('[data-testid="reply-button-1"]').click();

    // Try to submit empty reply
    cy.get('[data-testid="submit-reply-1"]').click();

    // Verify error toast appears
    cy.contains('Please enter a reply').should('be.visible');
  });

  it('handles reply input', () => {
    // Open reply form
    cy.get('[data-testid="reply-button-1"]').click();

    // Type reply
    const testReply = 'Test reply';
    cy.get('[data-testid="reply-input-1"]').type(testReply);
    cy.get('[data-testid="reply-input-1"]').should('have.value', testReply);
  });
}); 