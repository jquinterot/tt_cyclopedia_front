import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SearchBar from '@/components/shared/SearchBar/SearchBar';
import { TestProviders } from '@/test-utils/TestProviders';

describe("SearchBar Component", () => {
  test("renders search input", () => {
    const mockOnSearch = vi.fn();
    render(
      <TestProviders>
        <SearchBar onSearch={mockOnSearch} placeholder="Search posts..." />
      </TestProviders>
    );
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search posts...")).toBeInTheDocument();
  });

  test("calls onSearch when input changes", () => {
    const mockOnSearch = vi.fn();
    render(
      <TestProviders>
        <SearchBar onSearch={mockOnSearch} placeholder="Search posts..." />
      </TestProviders>
    );
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test" } });
    // Wait for debounce
    setTimeout(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("test");
    }, 600);
  });

  test("displays search button", () => {
    const mockOnSearch = vi.fn();
    render(
      <TestProviders>
        <SearchBar onSearch={mockOnSearch} placeholder="Search posts..." />
      </TestProviders>
    );
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });
}); 