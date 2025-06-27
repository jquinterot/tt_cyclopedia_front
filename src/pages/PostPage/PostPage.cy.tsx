import React from "react";
import PostPage from "./PostPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";

describe("<PostPage />", () => {
  it("renders the Post page", () => {
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <PostPage />
        </LanguageProvider>
      </BrowserRouter>
    );
    cy.get("[data-testid='post-page']").should("exist");
  });
}); 