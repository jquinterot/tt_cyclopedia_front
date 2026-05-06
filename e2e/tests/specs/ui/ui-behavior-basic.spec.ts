import { test, expect } from '@playwright/test';

test.describe('Basic UI Behavior Tests', () => {
  test.describe('Non-Logged User', () => {
    test('should show correct UI elements for non-logged user', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="navbar"]', { timeout: 30000 });
      await expect(page.getByTestId('nav-login')).toBeVisible({ timeout: 15000 });
      await expect(page.getByTestId('nav-login')).toHaveText('Sign In');
      await expect(page.getByTestId('user-profile')).not.toBeVisible();
      await expect(page.getByTestId('nav-posts')).toBeVisible();
      await expect(page.getByTestId('nav-forums')).toBeVisible();
      await expect(page.getByTestId('nav-about')).toBeVisible();
    });

    test('should redirect to login for protected routes', async ({ page }) => {
      await page.goto('/createPost');
      await page.waitForSelector('[data-testid="login-page"]', { timeout: 15000 });
      await expect(page.getByTestId('login-page')).toBeVisible();
      await page.goto('/profile');
      await page.waitForSelector('[data-testid="login-page"]', { timeout: 15000 });
      await expect(page.getByTestId('login-page')).toBeVisible();
    });

    test('should show navigation elements', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="navbar"]', { timeout: 30000 });
      await expect(page.getByTestId('nav-posts')).toBeVisible({ timeout: 15000 });
      await expect(page.getByTestId('nav-forums')).toBeVisible();
      await expect(page.getByTestId('nav-about')).toBeVisible();
    });

    test('should show mobile menu on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForSelector('[data-testid="mobile-menu-button"]', { timeout: 30000 });
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible();
      await page.getByTestId('mobile-menu-button').click();
      await expect(page.getByTestId('mobile-menu')).toBeVisible();
      await page.getByTestId('mobile-menu-button').click();
      await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
    });

    test('should toggle language', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="language-toggle"]', { timeout: 30000 });
      await expect(page.getByTestId('language-toggle')).toBeVisible();
      await page.getByTestId('language-toggle').click();
    });
    
    test('should show main page content', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="navbar"]', { timeout: 30000 });
      await expect(page.getByTestId('main-page')).toBeVisible({ timeout: 15000 });
      await expect(page.getByTestId('post-list-container')).toBeVisible();
      await expect(page.getByTestId('search-form')).toBeVisible();
    });
  });
}); 