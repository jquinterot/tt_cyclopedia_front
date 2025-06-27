import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MainPageLayout from "./MainPageLayout";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../../../contexts/LanguageContext";
import React from "react";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe("MainPageLayout Component", () => {
  test("renders page layout with navigation and footer", () => {
    const content = <div data-testid="page-content">Page Content</div>;
    renderWithProviders(<MainPageLayout>{content}</MainPageLayout>);
    
    expect(screen.getByTestId("main-page"));
    expect(screen.getByTestId("navbar"));
    expect(screen.getByTestId("footer"));
    expect(screen.getByTestId("page-content"));
  });

  test("renders children content", () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    renderWithProviders(<MainPageLayout>{customContent}</MainPageLayout>);
    expect(screen.getByTestId("custom-content"));
  });
}); 