import FeatureCard from "./FeatureCard";
import React from 'react';

describe("<FeatureCard />", () => {
  it("renders with correct props", () => {
    cy.mount(
      <FeatureCard
        title="Test Feature"
        description="Test description"
        testId="test-feature"
      />
    );

    cy.get('[data-testid="test-feature"]').should("exist");
    cy.get('[data-testid="test-feature"]').should("contain", "Test Feature");
    cy.get('[data-testid="test-feature"]').should("contain", "Test description");
  });
}); 