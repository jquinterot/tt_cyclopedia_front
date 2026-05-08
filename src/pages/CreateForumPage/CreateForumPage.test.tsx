import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CreateForumPage from "./CreateForumPage";

vi.mock("@/hooks/forums/useCreateForum", () => ({
  useCreateForum: () => ({
    mutateAsync: vi.fn().mockResolvedValue({ id: "new-forum" }),
    isPending: false,
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

const renderCreateForumPage = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <CreateForumPage />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

describe("CreateForumPage", () => {
  test("renders create forum page", () => {
    renderCreateForumPage();
    expect(screen.getByTestId("create-forum-page")).toBeInTheDocument();
  });

  test("shows create forum title", () => {
    renderCreateForumPage();
    expect(screen.getByTestId("create-forum-title")).toHaveTextContent(
      "Create New Forum",
    );
  });

  test("has title input field", () => {
    renderCreateForumPage();
    const titleInput = screen.getByTestId("forum-title-input");
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute("type", "text");
  });

  test("has content textarea", () => {
    renderCreateForumPage();
    const contentInput = screen.getByTestId("forum-content-input");
    expect(contentInput).toBeInTheDocument();
  });

  test("has submit button", () => {
    renderCreateForumPage();
    expect(screen.getByTestId("forum-submit-button")).toBeInTheDocument();
  });

  test("has cancel button", () => {
    renderCreateForumPage();
    expect(screen.getByTestId("forum-cancel-button")).toBeInTheDocument();
  });

  test("can type in title input", () => {
    renderCreateForumPage();
    const titleInput = screen.getByTestId("forum-title-input");
    fireEvent.change(titleInput, { target: { value: "New Forum Title" } });
    expect(titleInput).toHaveValue("New Forum Title");
  });

  test("can type in content textarea", () => {
    renderCreateForumPage();
    const contentInput = screen.getByTestId("forum-content-input");
    fireEvent.change(contentInput, { target: { value: "Forum content here" } });
    expect(contentInput).toHaveValue("Forum content here");
  });

  test("has form element", () => {
    renderCreateForumPage();
    expect(screen.getByTestId("create-forum-form")).toBeInTheDocument();
  });
});
