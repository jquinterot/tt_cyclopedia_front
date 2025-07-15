import { test } from '@playwright/test';
import { loginWith } from '../../steps/loginSteps';
import { expectLoginError } from '../../steps/authSteps';

test.describe('Login Negative Scenarios', () => {
  test('should show error for non-existent user', async ({ page }) => {
    await loginWith(page, 'nonexistentuser', 'somepassword');
    await expectLoginError(page);
  });

  test('should show error for valid user but wrong password', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';

    await page.goto('/signup');
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Email').fill(email);
    await page.getByTestId('signup-password-input').fill(password);
    await page.getByTestId('signup-confirm-password-input').fill(password);
    await page.getByTestId('signup-submit').click();
    await page.waitForURL('/login', { timeout: 5000 });
    await loginWith(page, username, 'WrongPassword!');
    await expectLoginError(page);
  });

  test('should show error for empty username and password', async ({ page }) => {
    await loginWith(page, '', '');
    await expectLoginError(page);
  });
}); 