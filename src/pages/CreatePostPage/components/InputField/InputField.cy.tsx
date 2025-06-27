import React from "react";
import InputField from "./InputField";

describe("<InputField />", () => {
  it("renders with correct props", () => {
    const inputRef = { current: null };
    cy.mount(
      <InputField
        label="Test Label"
        id="test-id"
        inputRef={inputRef}
        placeholder="Test placeholder"
      />
    );

    cy.get("label").should("contain", "Test Label");
    cy.get("input").should("have.attr", "id", "test-id");
    cy.get("input").should("have.attr", "placeholder", "Test placeholder");
    cy.get("input").should("have.attr", "data-testid", "post-test-id-input");
  });
}); 