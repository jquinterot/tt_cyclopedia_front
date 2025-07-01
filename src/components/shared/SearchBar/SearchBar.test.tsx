import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders search input with correct placeholder', () => {
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Search..." testId="search-input" />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('renders search icon', () => {
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Search..." testId="search-input" />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('calls onChange when input changes', () => {
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Search..." testId="search-input" />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  test('displays the current value', () => {
    render(<SearchBar value="current value" onChange={mockOnChange} placeholder="Search..." testId="search-input" />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('current value');
  });

  test('applies custom test id', () => {
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Search..." testId="custom-test-id" />);
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });
}); 