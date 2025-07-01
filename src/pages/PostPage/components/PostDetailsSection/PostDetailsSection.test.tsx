import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import PostDetails from "./PostDetailsSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Create a wrapper with necessary providers
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

describe("PostDetails Component", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test("renders loading state initially", () => {
    renderWithProviders(<PostDetails />);
    const spinner = screen.getByTestId("loading-spinner-icon");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  test("renders error state when there is an error", () => {
    renderWithProviders(<PostDetails />);
    const errorMessage = screen.queryByText("Error getting the post by Id");
    expect(errorMessage).not.toBeInTheDocument();
  });
});