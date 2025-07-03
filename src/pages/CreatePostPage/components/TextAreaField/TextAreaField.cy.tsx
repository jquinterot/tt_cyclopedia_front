import TextAreaField from "./TextAreaField";
import React from 'react';

describe("<TextAreaField />", () => {
  it("renders with correct props", () => {
    const textareaRef = { current: null };
    cy.mount(
      <TextAreaField
        label="Test Label"
        id="test-id"
        inputRef={textareaRef}
        placeholder="Test placeholder"
      />
    );

    cy.get("label").should("contain", "Test Label");
    cy.get("textarea").should("have.attr", "id", "test-id");
    cy.get("textarea").should("have.attr", "placeholder", "Test placeholder");
    cy.get("textarea").should("have.attr", "data-testid", "post-test-id-input");
  });
}); 