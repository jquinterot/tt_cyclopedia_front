import { render } from "@testing-library/react";
import PostPage from "./PostPage";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("PostPage", () => {
  it("renders the Post page", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <PostPage />
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  });
}); 