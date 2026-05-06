import UserInfo from './UserInfo';
import { interceptGetUser } from '../../../../../cypress/mocks/userMocks';

describe('<UserInfo />', () => {
  beforeEach(() => {
    interceptGetUser();
  });

  it('renders with avatar and user info', () => {
    cy.mount(<UserInfo userId="test-user-id" />);
    cy.wait('@getUser');
    cy.get('[data-testid="user-info"]').should('be.visible');
    cy.get('[data-testid="avatar-fallback"]').should('be.visible');
    cy.get('[data-testid="username-test-user-id"]').should('contain', 'Test User');
  });
});
