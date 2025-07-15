import { test, expect } from '@playwright/test';
import { createTestDataTracker } from '../helpers/testDataTracker';

test.describe('Example Test with Automatic Teardown', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test('should create and clean up test data automatically', async ({ page }) => {
    const username = `testuser${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await page.goto('/signup');
    await page.getByTestId('signup-username-input').fill(username);
    await page.getByTestId('signup-email-input').fill(email);
    await page.getByTestId('signup-password-input').fill(password);
    await page.getByTestId('signup-confirm-password-input').fill(password);
    await page.getByTestId('signup-submit').click();
    await page.waitForURL('/login', { timeout: 5000 });
    await page.getByTestId('username-input').fill(username);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/', { timeout: 5000 });
    await page.getByTestId('create-post-button').click();
    await page.getByTestId('post-title-input').fill('Test Post Title');
    await page.getByTestId('post-content-input').fill('Test post content');
    await page.getByTestId('submit-button').click();
    await expect(page.getByText(/post successfully created/i)).toBeVisible({ timeout: 5000 });
  });
}); 