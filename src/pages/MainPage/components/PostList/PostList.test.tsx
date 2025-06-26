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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("PostList Component", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("renders the post list container", () => {
    renderWithProviders(<PostList />);
    expect(screen.getByTestId("post-list-container")).toBeInTheDocument();
  });
}); 