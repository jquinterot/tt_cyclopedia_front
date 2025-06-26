import React from "react";
import FormComment from './FormCommentSection';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '../../../../contexts/LanguageContext';

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

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <FormComment postId={mockPostId} />
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
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


