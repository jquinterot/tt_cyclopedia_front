import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MainContent from "./MainContent";
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

describe("MainContent Component", () => {
  test("renders main content container", () => {
    renderWithProviders(<MainContent />);
    expect(screen.getByTestId("main-content"));
  });

  test("renders custom children when provided", () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    renderWithProviders(<MainContent>{customContent}</MainContent>);
    expect(screen.getByTestId("custom-content"));
  });
}); 