import CreatePostForm from './CreatePostForm';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('<CreatePostForm />', () => {
  // Create a new client for each test
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  beforeEach(() => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CreatePostForm />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });

  it('renders form elements correctly', () => {
    cy.get('[data-testid="create-post-container"]').should('exist');
    cy.get('[data-testid="create-post-form"]').should('exist');
    cy.get('[data-testid="post-title-input"]').should('exist');
    cy.get('[data-testid="post-content-input"]').should('exist');
    cy.get('[data-testid="image-upload-area"]').should('exist');
    cy.get('[data-testid="image-input"]').should('exist');
  });

  it('handles form input', () => {
    const title = 'Test Post Title';
    const content = 'Test Post Content';

    // Type in form fields
    cy.get('[data-testid="post-title-input"]').type(title);
    cy.get('[data-testid="post-content-input"]').type(content);
    
    // Verify input values
    cy.get('[data-testid="post-title-input"]').should('have.value', title);
    cy.get('[data-testid="post-content-input"]').should('have.value', content);
  });

  it('handles form cancellation', () => {
    // Fill form
    cy.get('[data-testid="post-title-input"]').type('Test Title');
    cy.get('[data-testid="post-content-input"]').type('Test Content');
    
    // Cancel form
    cy.get('[data-testid="cancel-button"]').click();
    
    // Verify form is cleared
    cy.get('[data-testid="post-title-input"]').should('have.value', '');
    cy.get('[data-testid="post-content-input"]').should('have.value', '');
  });
});