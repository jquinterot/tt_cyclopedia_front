import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import HeartIconFilled from './HeartIconFilled';

describe('HeartIconFilled', () => {
  test('renders filled heart icon with correct test id', () => {
    render(<HeartIconFilled />);
    expect(screen.getByTestId('heart-icon-filled')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<HeartIconFilled className="custom-class" />);
    const icon = screen.getByTestId('heart-icon-filled');
    expect(icon).toHaveClass('custom-class');
  });

  test('passes through additional props', () => {
    render(<HeartIconFilled data-custom="test" />);
    const icon = screen.getByTestId('heart-icon-filled');
    expect(icon).toHaveAttribute('data-custom', 'test');
  });
}); 