import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SearchBar from './SearchBar';
import { TestProviders } from '@/test-utils/TestProviders';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search input with correct placeholder', () => {
    render(
      <TestProviders>
        <SearchBar onSearch={mockOnSearch} placeholder="Search..." />
      </TestProviders>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('renders search button', () => {
    render(
      <TestProviders>
        <SearchBar onSearch={mockOnSearch} placeholder="Search..." />
      </TestProviders>
    );
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  test('calls onSearch when input changes', () => {
    render(
      <TestProviders>
        <SearchBar onSearch={mockOnSearch} placeholder="Search..." />
      </TestProviders>
    );
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test' } });
    // Wait for debounce
    setTimeout(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test');
    }, 600);
  });

  test('displays the current value', () => {
    render(
      <TestProviders>
        <SearchBar onSearch={mockOnSearch} placeholder="Search..." />
      </TestProviders>
    );
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'current value' } });
    expect(input).toHaveValue('current value');
  });

  test('applies custom className', () => {
    render(
      <TestProviders>
        <SearchBar onSearch={mockOnSearch} placeholder="Search..." className="custom-class" />
      </TestProviders>
    );
    const form = screen.getByTestId('search-form');
    expect(form).toHaveClass('custom-class');
  });
}); 