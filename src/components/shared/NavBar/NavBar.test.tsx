import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import NavBar from './NavBar';
import '@testing-library/jest-dom/vitest';

describe("NavBar Component", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders logo with responsive text", () => {
    render(<NavBar />);
    
    // Check logo elements
    const logoLink = screen.getByRole('link', { name: /TT Cyclopedia/i });
    expect(logoLink).toBeInTheDocument();
    
    // Desktop TT version
    const desktopTT = within(logoLink).getByText('TT', { selector: '.hidden.sm\\:inline' });
    expect(desktopTT).toBeInTheDocument();
    
    // Mobile TT version
    const mobileTT = within(logoLink).getByText('TT', { selector: '.sm\\:hidden' });
    expect(mobileTT).toBeInTheDocument();
  });

  test("shows desktop navigation on large screens", () => {
    render(<NavBar />);
    
    const desktopNav = screen.getByTestId('desktop-nav');
    expect(desktopNav).toBeVisible();
    
    const links = within(desktopNav).getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent(/Home/i);
    expect(links[1]).toHaveTextContent(/Create Post/i);
    expect(links[2]).toHaveTextContent(/About/i);
  });

  test("toggles mobile menu correctly", async () => {
    render(<NavBar />);
    
    const menuButton = screen.getByRole('button', { name: /Open main menu/i });
    
    // Initial state - closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('mobile-menu')).toBeNull();
    
    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeVisible();
    
    // Verify mobile menu links
    const mobileLinks = within(mobileMenu).getAllByRole('link');
    expect(mobileLinks).toHaveLength(3);
    expect(mobileLinks[0]).toHaveTextContent(/Home/i);
    
    // Close menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('mobile-menu')).toBeNull();
  });

  test("mobile menu button shows correct icon", () => {
    render(<NavBar />);
    
    const menuButton = screen.getByRole('button', { name: /Open main menu/i });
    const svg = menuButton.querySelector('svg')!;
    
    // Initial closed state (hamburger icon)
    let path = svg.querySelector('path')!;
    expect(path.getAttribute('d')).toMatch(/M4 6h16M4 12h16M4 18h16/);
    
    // Open menu
    fireEvent.click(menuButton);
    path = svg.querySelector('path')!;
    expect(path.getAttribute('d')).toMatch(/M6 18L18 6M6 6l12 12/);
  });
});