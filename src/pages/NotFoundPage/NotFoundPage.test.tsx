import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  test("renders 404 code", () => {
    render(
  
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
  
    );
    expect(screen.getByTestId("not-found-code")).toHaveTextContent("404");
  });

  test("renders heading", () => {
    render(
  
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
  
    );
    expect(screen.getByTestId("not-found-heading")).toHaveTextContent("Page Not Found");
  });

  test("renders error message", () => {
    render(
  
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
  
    );
    expect(screen.getByTestId("not-found-message")).toBeInTheDocument();
  });

  test("renders home link", () => {
    render(
  
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
  
    );
    const link = screen.getByTestId("not-found-home-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  test("renders forums link", () => {
    render(
  
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
  
    );
    const link = screen.getByTestId("not-found-forums-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/forums");
  });

  test("renders popular pages section", () => {
    render(
  
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
  
    );
    expect(screen.getByTestId("not-found-popular-heading")).toHaveTextContent("Popular Pages");
    expect(screen.getByTestId("not-found-popular-links")).toBeInTheDocument();
  });

  test("popular links are clickable", () => {
    render(
  
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
  
    );
    const links = screen.getByTestId("not-found-popular-links").querySelectorAll("a");
    expect(links.length).toBe(4);
  });
});
