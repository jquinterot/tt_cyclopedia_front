import CreatePostPage from "./CreatePostPage";
import { setAuthenticatedUser } from '../../../cypress/mocks/userMocks';

describe("<CreatePostPage />", () => {
  it("renders the Create Post page", () => {
    setAuthenticatedUser();
    cy.mount(<CreatePostPage />);
    cy.get("[data-testid='create-post-page']").should("exist");
  });
}); 