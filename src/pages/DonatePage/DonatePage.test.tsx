import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import DonatePage from "./DonatePage";

const renderDonatePage = () => {
  return render(
    <BrowserRouter>
      <DonatePage />
    </BrowserRouter>,
  );
};

describe("DonatePage", () => {
  test("renders donate page", () => {
    renderDonatePage();
    expect(screen.getByTestId("donate-page")).toBeInTheDocument();
  });

  test("shows heading", () => {
    renderDonatePage();
    expect(screen.getByTestId("donate-heading")).toHaveTextContent(
      "Support TT Cyclopedia",
    );
  });

  test("shows donate button", () => {
    renderDonatePage();
    const button = screen.getByTestId("donate-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Buy Me a Coffee");
  });

  test("donate button links to external URL", () => {
    renderDonatePage();
    const button = screen.getByTestId("donate-button");
    expect(button).toHaveAttribute("href", "https://coff.ee/tt_cyclopedia");
  });

  test("has back to home link", () => {
    renderDonatePage();
    const link = screen.getByTestId("donate-back-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  test("has content section", () => {
    renderDonatePage();
    expect(screen.getByTestId("donate-content")).toBeInTheDocument();
  });
});
