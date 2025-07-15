import { test, expect } from '@playwright/test';
import { signupAndLoginStep } from '../../steps/authSteps';
import { LoginPage } from '../../pages/LoginPage';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('Login Flow', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test('should sign up and log in with valid credentials', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
    const loginPage = new LoginPage(page);
    await expect(loginPage.loginPage).toBeVisible();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(page.getByText(/successfully logged in/i)).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL('/');
  });
}); 