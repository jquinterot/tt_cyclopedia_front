import FormComment from './FormComment';
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock API hooks
vi.mock('../../../hooks/comments/useComments', () => ({
  useComments: (postId: string) => ({
    comments: [
      { id: '1', comment: 'Test comment', userId: 'test-user' }
    ],
    error: null,
    isLoading: false
  })
}));

vi.mock('../../../hooks/comments/usePostComments', () => ({
  usePostComment: (postId: string) => ({
    mutateAsync: vi.fn()
  })
}));

// Mock useParams if needed
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => ({ id: 'test-id' })
}));

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={['/posts/test-id']}>
      <Routes>
        <Route path="/posts/:id" element={children} />
      </Routes>
    </MemoryRouter>
  </QueryClientProvider>
);

describe("FormComment", () => {
  test("should render FormComment", () => {
    render(
      <Wrapper>
        <FormComment />
      </Wrapper>
    );

    // Verify buttons
    expect(screen.getByRole('button', { name: 'Add Comment' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();

    // Verify input field
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    // Verify header text
    expect(screen.getByText(/Add Comment/i)).toBeInTheDocument();
  });
});