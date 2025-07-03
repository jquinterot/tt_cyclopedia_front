/// <reference types="cypress" />
import React from 'react';
import PasswordStrength from './PasswordStrength';
import { validatePassword } from '../../utils/security';

describe('<PasswordStrength />', () => {
  it('renders and displays strength', () => {
    const validation = validatePassword('abc12345');
    cy.mount(<PasswordStrength validation={validation} />);
    cy.get('[data-testid="password-strength-bar"]').should('exist');
  });
}); 