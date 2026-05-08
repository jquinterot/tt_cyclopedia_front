import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import "@testing-library/jest-dom/vitest";

describe("Footer Component", () => {
  test("renders footer content correctly", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(getByTestId("footer")).toBeInTheDocument();
    expect(getByTestId("footer-heading")).toHaveTextContent("TT Cyclopedia");
    expect(getByTestId("footer-description")).toHaveTextContent(
      "Your premier destination for comprehensive blade equipment reviews",
    );

    const currentYear = new Date().getFullYear();
    expect(getByTestId("footer-copyright")).toHaveTextContent(
      `© ${currentYear} TT Cyclopedia. All rights reserved.`,
    );
  });

  test("has proper styling", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const footer = getByTestId("footer");
    expect(footer).toHaveClass(
      "bg-slate-900/60",
      "backdrop-blur-md",
      "text-white",
      "mt-auto",
    );

    const content = getByTestId("footer-content");
    expect(content).toHaveClass(
      "border-t",
      "border-white/5",
      "bg-slate-900/80",
    );
  });
});
