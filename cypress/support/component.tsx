/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-namespace */
import './commands';
import { mount } from 'cypress/react18';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import type { MountOptions } from 'cypress/react18';
import '../../../../../cypress/support/component';
import React from 'react';

// Create a new query client instance for tests
const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Custom wrapper component
const WithProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={testQueryClient}>
    {children}
  </QueryClientProvider>
);

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount; // Updated to use customMount
    }
  }
}

// Custom mount command with provider wrapping


const customMount = (component: React.ReactNode, options?: MountOptions) => {
  return mount(<WithProviders>{component}</WithProviders>, options);
};

Cypress.Commands.add('mount', customMount); // Register the custom mount command

// Optional: Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('QueryClient')) {
    return false; // prevent test failure
  }
  return true;
});