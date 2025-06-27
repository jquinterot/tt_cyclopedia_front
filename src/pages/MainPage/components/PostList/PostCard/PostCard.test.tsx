import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import PostCard from "./PostCard";
import React from "react";

const mockPost = {
  id: "1",
  title: "Test Post",
  content: "Test content",
  image_url: "/test.jpg",
  likes: 5,
};

describe("PostCard Component", () => {
  test("renders post card with correct data", () => {
    const mockOnClick = vi.fn();
    render(<PostCard post={mockPost} onClick={mockOnClick} />);
    
    expect(screen.getByTestId("post-card-1"));
    expect(screen.getByTestId("post-title-1")).toHaveTextContent("Test Post");
    expect(screen.getByTestId("post-excerpt-1")).toHaveTextContent("Test content");
  });

  test("calls onClick when card is clicked", () => {
    const mockOnClick = vi.fn();
    render(<PostCard post={mockPost} onClick={mockOnClick} />);
    
    const card = screen.getByTestId("post-card-1");
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("displays likes count", () => {
    const mockOnClick = vi.fn();
    render(<PostCard post={mockPost} onClick={mockOnClick} />);
    
    expect(screen.getByText("5"));
  });
}); 