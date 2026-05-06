import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProfilePage from "./ProfilePage";

import type { User } from "@/types/User";

const queryClient = new QueryClient();

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

const renderProfilePage = (authState: AuthState = { isAuthenticated: false, user: null }) => {
  localStorage.clear();
  if (authState.user) {
    localStorage.setItem("authToken", "test-token");
    localStorage.setItem("user", JSON.stringify(authState.user));
    localStorage.setItem("isAuthenticated", "true");
  }

  return render(

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <AuthProvider>
              <ProfilePage />
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>

  );
};

describe("ProfilePage", () => {
  test("shows login required when not authenticated", () => {
    renderProfilePage();
    expect(screen.getByTestId("profile-login-required")).toBeInTheDocument();
  });

  test("renders profile page when authenticated", () => {
    renderProfilePage({
      isAuthenticated: true,
      user: { id: "1", username: "testuser", email: "test@example.com" }
    });

    expect(screen.getByTestId("profile-page")).toBeInTheDocument();
  });

  test("shows profile title when authenticated", () => {
    renderProfilePage({
      isAuthenticated: true,
      user: { id: "1", username: "testuser", email: "test@example.com" }
    });

    expect(screen.getByTestId("profile-title")).toHaveTextContent("My Profile");
  });

  test("shows username when authenticated", () => {
    renderProfilePage({
      isAuthenticated: true,
      user: { id: "1", username: "testuser", email: "test@example.com" }
    });

    expect(screen.getByTestId("profile-username")).toHaveTextContent("testuser");
  });

  test("shows avatar with user initial when authenticated", () => {
    renderProfilePage({
      isAuthenticated: true,
      user: { id: "1", username: "testuser", email: "test@example.com" }
    });

    expect(screen.getByTestId("profile-avatar")).toBeInTheDocument();
  });

  test("renders SessionStatus component when authenticated", () => {
    renderProfilePage({
      isAuthenticated: true,
      user: { id: "1", username: "testuser", email: "test@example.com" }
    });

    expect(screen.getByTestId("profile-details")).toBeInTheDocument();
  });
});
