import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ForumsPage from "./ForumsPage";

vi.mock("@/hooks/forums", () => ({
  useForums: () => ({
    data: [
      {
        id: "1",
        title: "Test Forum",
        content: "Test forum content for testing purposes",
        author: "testuser",
        timestamp: "2024-01-01T00:00:00Z",
        likes: 5,
        liked_by_current_user: false,
      },
      {
        id: "2",
        title: "Another Forum",
        content: "Another test forum",
        author: "user2",
        timestamp: "2024-01-02T00:00:00Z",
        likes: 3,
        liked_by_current_user: true,
      },
    ],
    isLoading: false,
    error: null,
  }),
  useLikeForum: () => ({
    likeMutation: { mutate: vi.fn(), isPending: false },
    unlikeMutation: { mutate: vi.fn(), isPending: false },
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});
const renderForumsPage = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <ForumsPage />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

describe("ForumsPage", () => {
  test("renders forums page", () => {
    renderForumsPage();
    expect(screen.getByTestId("forums-page")).toBeInTheDocument();
  });

  test("shows forums heading", () => {
    renderForumsPage();
    expect(screen.getByTestId("forums-heading")).toHaveTextContent("Forums");
  });

  test("renders search bar", () => {
    renderForumsPage();
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
  });

  test("renders forum cards", () => {
    renderForumsPage();
    expect(screen.getByTestId("forum-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("forum-card-2")).toBeInTheDocument();
  });

  test("shows forum title in card", () => {
    renderForumsPage();
    expect(screen.getByTestId("forum-card-title-1")).toHaveTextContent(
      "Test Forum",
    );
  });

  test("shows forum content preview in card", () => {
    renderForumsPage();
    expect(screen.getByTestId("forum-card-content-1")).toBeInTheDocument();
  });

  test("shows like button for each forum", () => {
    renderForumsPage();
    expect(screen.getByTestId("forum-card-like-button-1")).toBeInTheDocument();
    expect(screen.getByTestId("forum-card-like-button-2")).toBeInTheDocument();
  });

  test("shows filled heart for liked forum", () => {
    renderForumsPage();
    expect(
      screen.getByTestId("forum-card-like-icon-filled-2"),
    ).toBeInTheDocument();
  });

  test("shows outline heart for unliked forum", () => {
    renderForumsPage();
    expect(
      screen.getByTestId("forum-card-like-icon-outline-1"),
    ).toBeInTheDocument();
  });
});
