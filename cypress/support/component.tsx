// cypress/support/component.ts

import './commands'
import { mount } from 'cypress/react18'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

// Create a new query client instance for tests
const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

// Custom wrapper component
const WithProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={testQueryClient}>
    {children}
  </QueryClientProvider>
)

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

// Custom mount command
Cypress.Commands.add('mount', mount)

// Optional: Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('QueryClient')) {
    return false // prevent test failure
  }
  return true
})