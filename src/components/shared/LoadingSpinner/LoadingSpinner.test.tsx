import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import { describe, expect } from 'vitest';

describe('LoadingSpinner', () => {
  it('renders', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
}); 