import { render } from '@testing-library/react';
import { TestProviders } from '../../../../test-utils/TestProviders';
import FormForumComment from './FormCommentSection';

describe('FormForumComment', () => {
  it('renders without crashing', () => {
    render(
      <TestProviders>
        <FormForumComment forumId="test-id" />
      </TestProviders>
    );
  });
}); 