import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SearchBar from "./SearchBar";
import React from "react";

describe("SearchBar Component", () => {
  test("renders search input", () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    expect(screen.getByTestId("post-search-input"));
    expect(screen.getByPlaceholderText("Search posts..."));
  });

  test("calls onChange when input changes", () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    const input = screen.getByTestId("post-search-input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(mockOnChange).toHaveBeenCalledWith("test");
  });

  test("displays search icon", () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    expect(screen.getByTestId("search-icon"));
  });
}); 