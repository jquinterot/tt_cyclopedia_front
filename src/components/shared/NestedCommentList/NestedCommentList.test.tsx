import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { NestedCommentList, NestedComment } from './NestedCommentList';

const mockReply: NestedComment = {
  id: '1',
  comment: 'Test reply',
  user_id: 'user1',
  username: 'testuser',
  likes: 5,
  liked_by_current_user: false,
  timestamp: '2023-01-01T00:00:00Z'
};

const mockProps = {
  replies: [mockReply],
  parentId: 'parent1',
  onDeleteReply: vi.fn(),
  onLikeToggle: vi.fn(),
  onEdit: vi.fn().mockResolvedValue(undefined),
  renderUserInfo: vi.fn().mockReturnValue(<div>User Info</div>),
  isLikePending: false,
  isEditPending: false
};

describe('NestedCommentList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders nested comments list', () => {
    render(<NestedCommentList {...mockProps} />);
    expect(screen.getByTestId('nested-comment-list')).toBeInTheDocument();
  });

  test('renders individual comment', () => {
    render(<NestedCommentList {...mockProps} />);
    expect(screen.getByTestId('nested-comment-1')).toBeInTheDocument();
  });

  test('displays comment text', () => {
    render(<NestedCommentList {...mockProps} />);
    expect(screen.getByTestId('nested-comment-text-1')).toHaveTextContent('Test reply');
  });

  test('calls onLikeToggle when like button is clicked', () => {
    render(<NestedCommentList {...mockProps} />);
    fireEvent.click(screen.getByTestId('nested-like-button-1'));
    expect(mockProps.onLikeToggle).toHaveBeenCalledWith(mockReply);
  });

  test('calls onDeleteReply when delete button is clicked', () => {
    render(<NestedCommentList {...mockProps} />);
    fireEvent.click(screen.getByTestId('nested-delete-button-1'));
    expect(mockProps.onDeleteReply).toHaveBeenCalledWith('1', 'parent1');
  });

  test('enters edit mode when edit button is clicked', () => {
    render(<NestedCommentList {...mockProps} />);
    fireEvent.click(screen.getByTestId('nested-edit-button-1'));
    expect(screen.getByTestId('nested-edit-input-1')).toBeInTheDocument();
  });

  test('calls onEdit when save button is clicked', async () => {
    render(<NestedCommentList {...mockProps} />);
    fireEvent.click(screen.getByTestId('nested-edit-button-1'));
    
    const input = screen.getByTestId('nested-edit-input-1');
    fireEvent.change(input, { target: { value: 'Updated comment' } });
    
    fireEvent.click(screen.getByTestId('nested-save-edit-1'));
    
    await waitFor(() => {
      expect(mockProps.onEdit).toHaveBeenCalledWith(mockReply, 'Updated comment');
    });
  });

  test('returns null when no replies', () => {
    const { container } = render(<NestedCommentList {...mockProps} replies={[]} />);
    expect(container.firstChild).toBeNull();
  });
}); 