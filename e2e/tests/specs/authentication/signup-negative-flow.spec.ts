import { test, expect } from '@playwright/test';
import { deleteTestUser } from '../../helpers/teardown';

test.describe('Signup Negative Scenarios', () => {
  test.afterEach(async () => {
    await deleteTestUser('cyclopedia');
  });

  test('should show error for empty fields', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('signup-submit').click();
    await expect(page.getByText(/validation errors/i, { exact: false })).toBeVisible({ timeout: 7000 });
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('signup-username-input').fill('user' + Date.now());
    await page.getByTestId('signup-email-input').fill('not-an-email');
    await page.getByTestId('signup-password-input').fill('TestPassword123!');
    await page.getByTestId('signup-confirm-password-input').fill('TestPassword123!');
    await page.getByTestId('signup-submit').click();
    await expect(page.getByText('Need @ symbol')).toBeVisible();
    await expect(page.getByText('Need dot')).toBeVisible();
  });

  test('should show error for password mismatch', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('signup-username-input').fill('user' + Date.now());
    await page.getByTestId('signup-email-input').fill('user@test.com');
    await page.getByTestId('signup-password-input').fill('TestPassword123!');
    await page.getByTestId('signup-confirm-password-input').fill('DifferentPassword!');
    await page.getByTestId('signup-submit').click();
    await expect(page.getByText('Passwords mismatch')).toBeVisible();
  });
}); 