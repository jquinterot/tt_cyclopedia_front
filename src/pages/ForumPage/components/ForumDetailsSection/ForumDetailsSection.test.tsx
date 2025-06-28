import { render } from '@testing-library/react';
import { TestProviders } from '@/test-utils/TestProviders';
import ForumDetailsSection from './ForumDetailsSection';

describe('ForumDetailsSection', () => {
  it('renders without crashing', () => {
    render(
      <TestProviders>
        <ForumDetailsSection />
      </TestProviders>
    );
  });
}); 