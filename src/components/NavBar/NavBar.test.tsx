import { describe, test, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@testing-library/jest-dom/vitest';
import { AuthProvider } from '@/contexts/AuthContext';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          {component}
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe("NavBar Component", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders logo and brand name", () => {
    const { getByTestId } = renderWithRouter(<NavBar />);
    
    const logo = getByTestId("navbar-logo");
    expect(logo).toBeInTheDocument();
    
    const logoLink = getByTestId("logo-link");
    expect(logoLink).toHaveTextContent("TT");
    expect(logoLink).toHaveTextContent("Cyclopedia");
  });

  test("shows desktop navigation links", () => {
    const { getByTestId } = renderWithRouter(<NavBar />);
    
    const desktopNav = getByTestId("desktop-nav");
    expect(desktopNav).toBeInTheDocument();
    
    expect(getByTestId("nav-posts")).toHaveTextContent("Posts");
    expect(getByTestId("nav-about")).toHaveTextContent("About");
  });

  test("toggles mobile menu", () => {
    const { getByRole, queryByTestId } = renderWithRouter(<NavBar />);
    
    const menuButton = getByRole("button", { name: /open main menu/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(queryByTestId("mobile-menu")).not.toBeInTheDocument();
    
    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(queryByTestId("mobile-menu")).toBeInTheDocument();
    
    // Close menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});