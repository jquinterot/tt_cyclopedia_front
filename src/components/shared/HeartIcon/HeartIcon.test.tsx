import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import HeartIcon from './HeartIcon';

describe('HeartIcon', () => {
  test('renders heart icon with correct test id', () => {
    render(<HeartIcon />);
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<HeartIcon className="custom-class" />);
    const icon = screen.getByTestId('heart-icon');
    expect(icon).toHaveClass('custom-class');
  });

  test('passes through additional props', () => {
    render(<HeartIcon data-custom="test" />);
    const icon = screen.getByTestId('heart-icon');
    expect(icon).toHaveAttribute('data-custom', 'test');
  });
}); 