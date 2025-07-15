import { render } from '@testing-library/react';
import { TestProviders } from '../../../../test-utils/TestProviders';
import { ForumCommentTree } from './ForumCommentTree';
import { vi } from 'vitest';

vi.mock('@/config/apiClient', () => ({
  apiClient: {
    get: vi.fn().mockResolvedValue({
      data: [
        {
          id: 'comment-1',
          comment: 'Test comment',
          user_id: 'user1',
          username: 'User One',
          likes: 0,
          liked_by_current_user: false,
          timestamp: '2023-01-01T00:00:00Z',
        },
      ],
    }),
  },
  SESSION_EXPIRED_EVENT: 'session-expired',
}));

describe('ForumCommentTree', () => {
  it('renders without crashing', () => {
    render(
      <TestProviders>
        <ForumCommentTree forumId="test-id" />
      </TestProviders>
    );
  });
}); 