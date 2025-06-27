import React from "react";
import CreatePostPage from "./CreatePostPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";

describe("<CreatePostPage />", () => {
  it("renders the Create Post page", () => {
    cy.mount(
      <BrowserRouter>
        <LanguageProvider>
          <CreatePostPage />
        </LanguageProvider>
      </BrowserRouter>
    );
    cy.get("[data-testid='create-post-page']").should("exist");
  });
}); 