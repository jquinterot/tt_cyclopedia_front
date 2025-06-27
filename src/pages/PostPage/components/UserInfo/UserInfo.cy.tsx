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
    cy.get('[data-testid="user-avatar"]').should('be.visible');
    cy.get('[data-testid="username-test-user-id"]').should('contain', 'Test User');
  });

  it('shows loading state', () => {
    // Use a unique userId to avoid React Query cache
    const uniqueUserId = 'loading-user-id';
    interceptGetUser(uniqueUserId, 1500);
    cy.mount(<UserInfo userId={uniqueUserId} />);
    cy.get('[data-testid="user-avatar"]').should('exist');
    cy.contains('Loading').should('exist');
    cy.wait('@getUser');
  });
});