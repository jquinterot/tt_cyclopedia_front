import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Avatar from "./Avatar";

describe("Avatar Component", () => {
  test("renders default avatar icon when no src is provided", () => {
    render(<Avatar />);
    expect(screen.getByTestId("avatar-fallback")).toBeInTheDocument();
  });

  test("renders image when src is provided", () => {
    render(<Avatar src="/test-avatar.jpg" alt="Test User" />);
    expect(screen.getByTestId("avatar-image")).toBeInTheDocument();
    expect(screen.getByAltText("Test User")).toBeInTheDocument();
  });

  test("applies correct size classes", () => {
    const { rerender } = render(<Avatar size="sm" />);
    expect(screen.getByTestId("avatar-fallback")).toHaveClass("h-6", "w-6");

    rerender(<Avatar size="md" />);
    expect(screen.getByTestId("avatar-fallback")).toHaveClass("h-8", "w-8");

    rerender(<Avatar size="lg" />);
    expect(screen.getByTestId("avatar-fallback")).toHaveClass("h-12", "w-12");
  });

  test("applies custom className", () => {
    render(<Avatar className="custom-class" />);
    expect(screen.getByTestId("avatar-fallback")).toHaveClass("custom-class");
  });

  test("renders custom fallback icon", () => {
    const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
    render(<Avatar fallbackIcon={customIcon} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
}); 