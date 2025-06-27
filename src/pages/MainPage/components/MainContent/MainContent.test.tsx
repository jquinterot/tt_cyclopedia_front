import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MainContent from "./MainContent";
import { TestProviders } from "@/test-utils/TestProviders";
import { describe, test, expect, vi } from "vitest";

vi.mock("@/hooks/posts/usePosts", () => ({
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

describe("MainContent Component", () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(<TestProviders>{ui}</TestProviders>);

  test("renders main content container", () => {
    renderWithProviders(<MainContent />);
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
  });

  test("renders PostList by default", () => {
    renderWithProviders(<MainContent />);
    expect(screen.getByTestId("post-list-container")).toBeInTheDocument();
  });

  test("renders custom children when provided", () => {
    const customContent = <div data-testid="custom-content">Custom</div>;
    renderWithProviders(<MainContent>{customContent}</MainContent>);
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });
}); 