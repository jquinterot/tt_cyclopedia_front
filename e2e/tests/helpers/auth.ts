import { Page } from '@playwright/test';

// NOTE: If the user 'cyclopedia' already exists, signup will fail. Consider removing the user before running this test for idempotency.
export async function signup(page: Page) {
  const username = 'cyclopedia';
  const email = 'cyclopedia@test.com';
  const password = 'pass1234';
  await page.goto('/signup');
  await page.getByTestId('signup-username-input').fill(username);
  await page.getByTestId('signup-email-input').fill(email);
  await page.getByTestId('signup-password-input').fill(password);
  await page.getByTestId('signup-confirm-password-input').fill(password);
  await page.getByTestId('signup-submit').click();
  // Wait for login link to appear (robust for both redirect and no-redirect cases)
  await page.waitForSelector('[data-testid="login-link"]', { timeout: 7000 });
} 