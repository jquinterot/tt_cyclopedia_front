import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from './Footer';
import '@testing-library/jest-dom/vitest';

describe("Footer Component", () => {
  test("renders copyright text with current year", () => {
    render(<Footer />);
    
    const copyrightRegex = new RegExp(
      `© ${new Date().getFullYear()} TT Cyclopedia. All rights reserved.`
    );
    
    expect(screen.getByText(copyrightRegex)).toBeInTheDocument();
  });

  test("displays main heading and description", () => {
    render(<Footer />);

    // Check main heading
    expect(screen.getByRole('heading', { 
      name: /TT Cyclopedia/i,
      level: 2
    })).toBeInTheDocument();

    // Check description text
    const descriptionText = "Your premier destination for comprehensive blade equipment reviews. Share experiences, read detailed analyses, and connect with cutting enthusiasts worldwide.";
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });

  test("has proper styling classes", () => {
    const { container } = render(<Footer />);
    
    // Check main footer classes
    const footerElement = container.querySelector('footer');
    expect(footerElement).toHaveClass('bg-red-700');
    expect(footerElement).toHaveClass('text-white');
    expect(footerElement).toHaveClass('mt-auto');

    // Check border styling
    const borderDiv = container.querySelector('.border-red-900');
    expect(borderDiv).toBeInTheDocument();
  });
});