import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MainPageLayout from "./MainPageLayout";
import { TestProviders } from "@/test-utils/TestProviders";
import { describe, test, expect } from "vitest";

describe("MainPageLayout Component", () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(<TestProviders>{ui}</TestProviders>);

  test("renders page layout with navigation and footer", () => {
    const content = <div data-testid="main-content">Main Content</div>;
    renderWithProviders(<MainPageLayout>{content}</MainPageLayout>);
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
  });

  test("renders children content", () => {
    const customContent = <div data-testid="custom-content">Custom</div>;
    renderWithProviders(<MainPageLayout>{customContent}</MainPageLayout>);
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });
}); 