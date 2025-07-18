import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import SessionStatus from './SessionStatus';
import { TestProviders } from '../../../test-utils/TestProviders';

// Mock the window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true,
});

// Mock window.dispatchEvent
const mockDispatchEvent = vi.fn();
Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
  writable: true,
});

describe('SessionStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('shows not authenticated message when user is not logged in', () => {
    render(
      <TestProviders>
        <SessionStatus />
      </TestProviders>
    );

    expect(screen.getByText('Session Status')).toBeInTheDocument();
    expect(screen.getByText('Not authenticated')).toBeInTheDocument();
  });

  test('shows user information when authenticated', () => {
    // Set up authenticated user in localStorage
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com'
    };
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('isAuthenticated', 'true');

    render(
      <TestProviders>
        <SessionStatus />
      </TestProviders>
    );

    expect(screen.getByText('Session Status')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Authenticated')).toBeInTheDocument();
  });

  test('simulate session expiration button triggers session expiration', () => {
    // Set up authenticated user in localStorage
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com'
    };
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('isAuthenticated', 'true');

    render(
      <TestProviders>
        <SessionStatus />
      </TestProviders>
    );

    const expireButton = screen.getByTestId('expire-session-btn');
    fireEvent.click(expireButton);

    // Check that localStorage was cleared
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
  });

  test('reload page button calls window.location.reload', () => {
    // Set up authenticated user in localStorage
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com'
    };
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('isAuthenticated', 'true');

    render(
      <TestProviders>
        <SessionStatus />
      </TestProviders>
    );

    const reloadButton = screen.getByTestId('reload-page-btn');
    fireEvent.click(reloadButton);

    expect(mockReload).toHaveBeenCalled();
  });
}); 