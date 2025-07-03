import { render } from '@testing-library/react';
import PerformanceOptimizer from './PerformanceOptimizer';
import { describe, it } from 'vitest';

describe('PerformanceOptimizer', () => {
  it('renders without crashing', () => {
    render(<PerformanceOptimizer />);
  });
}); 