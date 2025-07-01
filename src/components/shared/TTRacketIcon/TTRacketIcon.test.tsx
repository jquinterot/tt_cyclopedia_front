import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TTRacketIcon from './TTRacketIcon';

describe('TTRacketIcon', () => {
  test('renders TT racket icon with correct test id', () => {
    render(<TTRacketIcon />);
    expect(screen.getByTestId('tt-racket-icon')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<TTRacketIcon className="custom-class" />);
    const icon = screen.getByTestId('tt-racket-icon');
    expect(icon).toHaveClass('custom-class');
  });

  test('uses default className when not provided', () => {
    render(<TTRacketIcon />);
    const icon = screen.getByTestId('tt-racket-icon');
    expect(icon).toHaveClass('w-6', 'h-6');
  });
}); 