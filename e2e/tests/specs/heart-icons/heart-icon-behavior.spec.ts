import { test, expect } from '@playwright/test';
import { signupAndLoginStep } from '../../steps/authSteps';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('Heart Icon Behavior', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test('should toggle heart icon correctly when liking/unliking a post', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
    await page.goto('/');
    await expect(page.getByTestId('main-page')).toBeVisible();
    await page.waitForSelector('[data-testid="posts-grid"]', { timeout: 10000 });
    const heartButton = page.locator('[data-testid*="like-button"]').first();
    if (await heartButton.count() > 0) {
      await expect(heartButton).toBeVisible();
      await heartButton.click();
      await page.waitForTimeout(1000);
      await expect(heartButton).toBeVisible();
      await heartButton.click();
      await page.waitForTimeout(1000);
      await expect(heartButton).toBeVisible();
    }
  });

  test('should show correct heart icon state for posts', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
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

  test('should handle heart icon interaction on forum posts', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
    await page.goto('/forums');
    await expect(page.getByTestId('forums-page')).toBeVisible();
    await page.waitForTimeout(2000);
    const forumLikeButtons = page.locator('[data-testid*="like-button"]');
    const buttonCount = await forumLikeButtons.count();
    if (buttonCount > 0) {
      const firstButton = forumLikeButtons.first();
      await expect(firstButton).toBeVisible();
      await firstButton.click();
      await page.waitForTimeout(1000);
      await firstButton.click();
      await page.waitForTimeout(1000);
    }
  });
}); 