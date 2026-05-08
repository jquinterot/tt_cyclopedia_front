import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import PostImage from "./PostImage";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

describe("PostImage Component", () => {
  test("renders image with correct attributes", () => {
    render(
      <PostImage
        src="/test.jpg"
        alt="Test Post"
        postId="1"
        defaultImageUrl="/default.jpg"
      />,
    );

    const image = screen.getByTestId("post-image-1");
    const expectedSrc = API_BASE ? `${API_BASE}/test.jpg` : "/test.jpg";
    expect(image).toHaveAttribute("src", expectedSrc);
    expect(image).toHaveAttribute("alt", "Test Post");
  });

  test("renders image container", () => {
    render(
      <PostImage
        src="/test.jpg"
        alt="Test Post"
        postId="1"
        defaultImageUrl="/default.jpg"
      />,
    );

    expect(screen.getByTestId("post-image-container-1"));
  });
});
