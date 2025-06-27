import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MainComponent from "./MainComponent";
import React from "react";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

test("renders About page main structure", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <MainComponent />
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
  expect(screen.getByTestId("about-page"));
  expect(screen.getByTestId("about-content"));
}); 