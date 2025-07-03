import ImageUploadField from "./ImageUploadField";
import React from 'react';

describe("<ImageUploadField />", () => {
  it("renders image upload area", () => {
    const inputRef = { current: null };
    cy.mount(<ImageUploadField inputRef={inputRef} />);

    cy.get("label").should("contain", "Cover Image");
    cy.get('[data-testid="image-upload-area"]').should("exist");
    cy.get('[data-testid="image-input"]').should("exist");
    cy.get("span").should("contain", "Upload a file");
  });
}); 