// User mocks for Cypress tests

export const mockUser = {
  id: 'test-user-id',
  username: 'Test User',
  email: 'test@example.com',
};

export const mockUserMe = {
  id: 'test-user-id',
  username: 'test',
  email: 'test@example.com',
};

export function interceptGetUser(userId = 'test-user-id', delayMs = 1000) {
  cy.intercept('GET', `/users/${userId}`, {
    statusCode: 200,
    body: mockUser,
    delayMs,
  }).as('getUser');
}

export function interceptGetMe() {
  cy.intercept('GET', '/users/me', {
    statusCode: 200,
    body: mockUserMe,
  }).as('getMe');
}

export function setAuthenticatedUser(user = mockUserMe) {
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('authToken', 'mock-token');
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuthenticatedUser() {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
} 