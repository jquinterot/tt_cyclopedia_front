import { render } from '@testing-library/react';
import { TestProviders } from '@/test-utils/TestProviders';
import { ForumReplyList } from './ForumReplyList';

describe('ForumReplyList', () => {
  it('renders without crashing', () => {
    render(
      <TestProviders>
        <ForumReplyList parentId="parent-id" forumId="forum-id" onDeleteReply={() => {}} />
      </TestProviders>
    );
  });
}); 