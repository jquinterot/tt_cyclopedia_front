import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import GenericFormCommentSection from './GenericFormCommentSection';

const mockUseMainComments = vi.fn();
const mockUsePostComment = vi.fn();
const mockT = vi.fn((key: string) => key);
const mockCommentsSectionComponent = vi.fn(() => <div>Comments Section</div>);

const mockProps = {
  id: 'test-id',
  useMainComments: mockUseMainComments,
  usePostComment: mockUsePostComment,
  isAuthenticated: true,
  t: mockT,
  testIdPrefix: 'test-',
  CommentsSectionComponent: mockCommentsSectionComponent
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('GenericFormCommentSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMainComments.mockReturnValue({
      mainComments: [],
      error: null,
      isLoading: false
    });
    mockUsePostComment.mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue(undefined)
    });
  });

  test('renders comment form container', () => {
    render(<GenericFormCommentSection {...mockProps} />, { wrapper: createWrapper() });
    expect(screen.getByTestId('test-comment-form-container')).toBeInTheDocument();
  });

  test('renders comment input', () => {
    render(<GenericFormCommentSection {...mockProps} />, { wrapper: createWrapper() });
    expect(screen.getByTestId('test-comment-input')).toBeInTheDocument();
  });

  test('renders submit button when authenticated', () => {
    render(<GenericFormCommentSection {...mockProps} />, { wrapper: createWrapper() });
    expect(screen.getByTestId('test-submit-comment')).toBeInTheDocument();
  });

  test('renders sign in link when not authenticated', () => {
    render(<GenericFormCommentSection {...mockProps} isAuthenticated={false} />, { wrapper: createWrapper() });
    expect(screen.getByText('form.comment.signInButton')).toBeInTheDocument();
  });

  test('shows loading spinner when loading comments', () => {
    mockUseMainComments.mockReturnValue({
      mainComments: [],
      error: null,
      isLoading: true
    });
    render(<GenericFormCommentSection {...mockProps} />, { wrapper: createWrapper() });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('shows error message when there is an error', () => {
    mockUseMainComments.mockReturnValue({
      mainComments: [],
      error: new Error('Test error'),
      isLoading: false
    });
    render(<GenericFormCommentSection {...mockProps} />, { wrapper: createWrapper() });
    expect(screen.getByText('Error loading comments')).toBeInTheDocument();
  });

  test('renders comments list when there are comments', () => {
    mockUseMainComments.mockReturnValue({
      mainComments: [{ id: '1', comment: 'Test comment', user_id: 'user1', username: 'testuser', timestamp: '2023-01-01' }],
      error: null,
      isLoading: false
    });
    render(<GenericFormCommentSection {...mockProps} />, { wrapper: createWrapper() });
    expect(screen.getByTestId('test-comments-list-container')).toBeInTheDocument();
  });
}); 