import { test, expect } from '@playwright/test';
import { signupAndLoginStep } from '../../steps/authSteps';
import { NavBar } from '../../pages/NavBar';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('Logout Flow', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test('should log out the user from the desktop nav', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
    const navBar = new NavBar(page);
    await expect(navBar.userProfile).toBeVisible();
    await navBar.logout();
    await expect(navBar.navLogin).toBeVisible();
    await expect(navBar.userProfile).not.toBeVisible();
  });
}); 