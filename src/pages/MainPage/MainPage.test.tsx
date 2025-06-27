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
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <AuthProvider>
              {ui}
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

describe("MainPage Component", () => {
  test("renders main page structure", () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
  });

  test("renders PostList loading state", () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByTestId("post-list-loading")).toBeInTheDocument();
  });
}); 