import { render } from '@testing-library/react';
import { TestProviders } from '@/test-utils/TestProviders';
import ForumInfoSection from './ForumInfoSection';

describe('ForumInfoSection', () => {
  it('renders without crashing', () => {
    render(
      <TestProviders>
        <ForumInfoSection forum={{ id: '1', likes: 0, liked_by_current_user: false }} refetch={() => {}} />
      </TestProviders>
    );
  });
}); 