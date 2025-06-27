import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import PostStats from "./PostStats";

const mockStats = { speed: 7, spin: 8, control: 6, overall: 9 };

describe("PostStats Component", () => {
  test("renders stats heading", () => {
    render(<PostStats stats={mockStats} />);
    expect(screen.getByTestId("stats-heading"));
    expect(screen.getByText("Stats"));
  });

  test("renders all stat bars", () => {
    render(<PostStats stats={mockStats} />);
    expect(screen.getByText("Speed"));
    expect(screen.getByText("Spin"));
    expect(screen.getByText("Control"));
    expect(screen.getByText("Overall"));
  });
}); 