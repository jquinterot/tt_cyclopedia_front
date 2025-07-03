import { render, screen } from '@testing-library/react';
import PasswordStrength from './PasswordStrength';
import { describe, expect } from "vitest";
import { validatePassword } from '@/utils/security';

describe('PasswordStrength', () => {
  it('renders and displays strength', () => {
    const validation = validatePassword('abc12345');
    render(<PasswordStrength validation={validation} />);
    expect(screen.getByTestId('password-strength-bar')).toBeInTheDocument();
  });
}); 