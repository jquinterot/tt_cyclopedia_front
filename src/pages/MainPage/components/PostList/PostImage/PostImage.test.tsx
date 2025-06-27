import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import PostImage from "./PostImage";

describe("PostImage Component", () => {
  test("renders image with correct attributes", () => {
    render(<PostImage src="/test.jpg" alt="Test Post" postId="1" />);
    
    const image = screen.getByTestId("post-image-1");
    expect(image).toHaveAttribute("src", "/test.jpg");
    expect(image).toHaveAttribute("alt", "Test Post");
  });

  test("renders image container", () => {
    render(<PostImage src="/test.jpg" alt="Test Post" postId="1" />);
    
    expect(screen.getByTestId("post-image-container-1"));
  });
}); 