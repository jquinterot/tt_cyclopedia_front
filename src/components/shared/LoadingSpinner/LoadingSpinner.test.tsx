import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom';

describe('LoadingSpinner', () => {
  it('renders', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
}); 