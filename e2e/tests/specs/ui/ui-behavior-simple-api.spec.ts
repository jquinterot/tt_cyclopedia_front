import { test, expect } from '@playwright/test';
import { createUserAndLogin } from '../../steps/authSteps';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('Simple API Authentication Tests', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test('should create user via API and login successfully', async ({ page }) => {
    const credentials = await createUserAndLogin(page);
    tracker.trackUser(credentials.username);
    await expect(page.getByTestId('user-profile')).toBeVisible();
    await expect(page.getByTestId('user-profile-trigger')).toBeVisible();
    await expect(page.getByTestId('user-profile-trigger')).toContainText(credentials.username);
  });

  test('should show correct navigation for logged user', async ({ page }) => {
    const credentials = await createUserAndLogin(page);
    tracker.trackUser(credentials.username);
    await expect(page.getByTestId('nav-login')).not.toBeVisible();
    await expect(page.getByTestId('nav-posts')).toBeVisible();
    await expect(page.getByTestId('nav-forums')).toBeVisible();
    await expect(page.getByTestId('nav-about')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    const credentials = await createUserAndLogin(page);
    tracker.trackUser(credentials.username);
    await expect(page.getByTestId('user-profile')).toBeVisible();
    await page.getByTestId('user-profile-trigger').click();
    await page.getByTestId('profile-button').click();
    await expect(page.getByTestId('nav-login')).toBeVisible();
    await expect(page.getByTestId('user-profile')).not.toBeVisible();
  });
}); 