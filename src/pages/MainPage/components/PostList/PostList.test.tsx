import { describe, test, expect, vi } from "vitest";
vi.mock("../../../../../src/hooks/posts/usePosts", () => ({
  usePosts: () => ({
    posts: [
      {
        id: "1",
        title: "Test Post",
        content: "Test content",
        image_url: "/test.jpg",
        likes: 0,
      },
    ],
    isLoading: false,
    error: null,
  }),
}));
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import PostList from "./PostList";
import { TestProviders } from "@/test-utils/TestProviders";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<TestProviders>{ui}</TestProviders>);
};

describe("PostList Component", () => {
  test("renders the post list container", () => {
    renderWithProviders(<PostList />);
    expect(screen.getByTestId("post-list-container")).toBeInTheDocument();
  });
}); 