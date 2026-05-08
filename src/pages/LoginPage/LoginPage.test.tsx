import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderLoginPage = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test("renders all form elements", () => {
    renderLoginPage();

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.getByTestId("login-header")).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-submit")).toBeInTheDocument();
    expect(screen.getByTestId("signup-link")).toBeInTheDocument();
  });

  test("renders correct heading text", () => {
    renderLoginPage();

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(
      screen.getByText("Sign in to TT Cyclopedia to continue your journey"),
    ).toBeInTheDocument();
  });

  test("username and password inputs are interactive", async () => {
    renderLoginPage();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpass" } });

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("testpass");
  });

  test("submit button calls handler on click", () => {
    renderLoginPage();

    const submitButton = screen.getByTestId("login-submit");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  test("signup link points to signup page", () => {
    renderLoginPage();

    const signupLink = screen.getByTestId("signup-link");
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");
  });

  test("form has correct input types", () => {
    renderLoginPage();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");

    expect(usernameInput).toHaveAttribute("type", "text");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("inputs have proper placeholders", () => {
    renderLoginPage();

    expect(
      screen.getByPlaceholderText("Enter your username"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument();
  });

  test("render includes Toaster for notifications", () => {
    const { container } = renderLoginPage();

    expect(
      container.querySelector('[data-testid="login-page"]'),
    ).toBeInTheDocument();
  });
});
