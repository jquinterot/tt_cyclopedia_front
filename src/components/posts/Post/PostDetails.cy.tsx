import PostDetails from './PostDetails';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('<PostDetails />', () => {
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
  });

  it('renders container', () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PostDetails />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // Check for the main container
    cy.get('.flex.justify-center.items-center').should('exist');
  });

  it('renders loading spinner', () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PostDetails />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // Check for loading spinner
    cy.get('.animate-spin').should('exist');
    cy.get('.border-t-2.border-b-2.border-blue-500').should('exist');
  });
}); 