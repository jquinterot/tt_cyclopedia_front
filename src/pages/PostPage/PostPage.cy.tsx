import React from "react";
import PostPage from "./PostPage";
import { describe, it } from "vitest";

describe("<PostPage />", () => {
  it("renders the Post page", () => {
    cy.mount(<PostPage />);
    cy.get("[data-testid='post-page']").should("exist");
  });
}); 