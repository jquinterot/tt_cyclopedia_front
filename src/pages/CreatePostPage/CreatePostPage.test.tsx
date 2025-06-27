import { render } from "@testing-library/react";
import CreatePostPage from "./CreatePostPage";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("CreatePostPage", () => {
  it("renders the Create Post page", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <CreatePostPage />
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  });
}); 