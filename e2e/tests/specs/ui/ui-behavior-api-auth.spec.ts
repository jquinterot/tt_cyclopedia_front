import { test, expect } from '@playwright/test';
import { createUserAndLogin } from '../../steps/authSteps';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('UI Behavior Tests with API Authentication', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test.describe('Logged User', () => {
    test('should show correct UI elements for logged user', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await expect(page.getByTestId('nav-login')).not.toBeVisible();
      await expect(page.getByTestId('user-profile')).toBeVisible();
      await expect(page.getByTestId('user-profile-trigger')).toBeVisible();
      await expect(page.getByTestId('user-profile-trigger')).toContainText(credentials.username);
      await expect(page.getByTestId('nav-posts')).toBeVisible();
      await expect(page.getByTestId('nav-forums')).toBeVisible();
      await expect(page.getByTestId('nav-about')).toBeVisible();
    });
    test('should show user profile in mobile menu', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await page.setViewportSize({ width: 375, height: 667 });
      await page.getByTestId('mobile-menu-button').click();
      await expect(page.getByTestId('mobile-menu')).toBeVisible();
      await expect(page.getByTestId('mobile-nav-login')).not.toBeVisible();
      await expect(page.getByTestId('mobile-user-profile-dropdown')).toBeVisible();
      await expect(page.getByTestId('mobile-username')).toContainText(credentials.username);
      await expect(page.getByTestId('mobile-dropdown-profile-link')).toBeVisible();
      await expect(page.getByTestId('mobile-dropdown-logout-button')).toBeVisible();
    });
    test('should allow access to protected routes', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await page.goto('/createPost');
      await expect(page.getByTestId('create-post-page')).toBeVisible();
      await page.goto('/profile');
      await expect(page.getByTestId('profile-page')).toBeVisible();
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
  test.describe('Heart Icon Behavior', () => {
    test('should show heart icons on posts for logged user', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await page.goto('/');
      await expect(page.getByTestId('main-page')).toBeVisible();
      await page.waitForSelector('[data-testid="posts-grid"]', { timeout: 10000 });
      const likeButtons = page.locator('[data-testid*="like-button"]');
      const buttonCount = await likeButtons.count();
      if (buttonCount > 0) {
        for (let i = 0; i < Math.min(buttonCount, 3); i++) {
          const button = likeButtons.nth(i);
          await expect(button).toBeVisible();
          await expect(button).toBeEnabled();
        }
      }
    });
    test('should show heart icons on forums for logged user', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await page.goto('/forums');
      await expect(page.getByTestId('forums-page')).toBeVisible();
      await page.waitForTimeout(2000);
      const forumLikeButtons = page.locator('[data-testid*="like-button"]');
      const buttonCount = await forumLikeButtons.count();
      if (buttonCount > 0) {
        const firstButton = forumLikeButtons.first();
        await expect(firstButton).toBeVisible();
        await expect(firstButton).toBeEnabled();
      }
    });
  });
}); 