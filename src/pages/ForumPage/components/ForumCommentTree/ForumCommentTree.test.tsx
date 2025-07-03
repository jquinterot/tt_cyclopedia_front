import { render } from '@testing-library/react';
import { TestProviders } from '../../../../test-utils/TestProviders';
import { ForumCommentTree } from './ForumCommentTree';

describe('ForumCommentTree', () => {
  it('renders without crashing', () => {
    render(
      <TestProviders>
        <ForumCommentTree forumId="test-id" />
      </TestProviders>
    );
  });
}); 