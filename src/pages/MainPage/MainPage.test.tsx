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
import MainPage from "./MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";
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
        <LanguageProvider>
          {ui}
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("MainPage Component", () => {
  test("renders main page structure", () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByTestId("main-page"));
    expect(screen.getByTestId("main-content"));
  });

  test("renders PostList loading state", () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByTestId("post-list-loading"));
  });
}); 