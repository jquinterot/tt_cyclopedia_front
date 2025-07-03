/// <reference types="cypress" />
/// <reference types="cypress/react18" />
import React from 'react';
import ProfilePage from './ProfilePage';
import { AuthContext } from '../contexts/AuthContext';
import type { User } from '../types/User';

const mockUser: User = {
  id: 'user-1',
  username: 'testuser',
  email: 'test@example.com',
};

function MockAuthProvider({ user, children }: { user: User | null, children: React.ReactNode }) {
  // Minimal mock for useAuth
  const value = {
    user,
    token: 'mock-token',
    isAuthenticated: !!user,
    login: () => {},
    logout: () => {},
    updateToken: () => {},
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

describe('<ProfilePage />', () => {
  it('shows login required if not authenticated', () => {
    cy.mount(
      <MockAuthProvider user={null}>
        <ProfilePage />
      </MockAuthProvider>
    );
    cy.get('[data-testid="profile-login-required"]').should('be.visible');
  });

  it('shows profile info if authenticated', () => {
    cy.mount(
      <MockAuthProvider user={mockUser}>
        <ProfilePage />
      </MockAuthProvider>
    );
    cy.get('[data-testid="profile-page"]').should('be.visible');
    cy.get('[data-testid="profile-title"]').should('contain', 'My Profile');
    cy.get('[data-testid="profile-username"]').should('contain', mockUser.username);
    cy.get('[data-testid="profile-details"]').should('contain', mockUser.email);
  });
}); 