import { test, expect } from '@playwright/test';
import { signupAndLoginStep } from '../steps/authSteps';
import { NavBar } from '../pages/NavBar';

test.describe('Logout Flow', () => {
  test('should log out the user from the desktop nav', async ({ page }) => {
    // Sign up and log in a new user
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);

    // Logout using NavBar page object
    const navBar = new NavBar(page);
    await expect(navBar.userProfile).toBeVisible();
    await navBar.logout();

    // Assert user is logged out (login button visible, user profile gone)
    await expect(navBar.loginButton).toBeVisible();
    await expect(navBar.userProfile).toHaveCount(0);
  });
}); 