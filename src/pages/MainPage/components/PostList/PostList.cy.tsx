import PostList from "./PostList";
import React from 'react';

beforeEach(() => {
  cy.intercept('GET', '/posts', {
    statusCode: 200,
    body: [
      { id: '1', title: 'Test Post', content: 'Test content' },
      // Add more mock posts if needed
    ],
  }).as('getPosts');
});

describe("<PostList />", () => {
  it("renders the post list container", () => {
    cy.mount(<PostList />);
    cy.get("[data-testid='post-list-container']").should("exist");
  });
}); 