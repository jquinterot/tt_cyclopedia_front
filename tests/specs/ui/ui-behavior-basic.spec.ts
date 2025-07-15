import { test, expect } from '@playwright/test';

// No custom steps or helpers used in this file, but if you add any, use '../../steps/' or '../../helpers/'

test.describe('Basic UI Behavior Tests', () => {
  test.describe('Non-Logged User', () => {
    test('should show correct UI elements for non-logged user', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByTestId('nav-login')).toBeVisible();
      await expect(page.getByTestId('nav-login')).toHaveText('Sign In');
      await expect(page.getByTestId('user-profile')).not.toBeVisible();
      await expect(page.getByTestId('nav-posts')).toBeVisible();
      await expect(page.getByTestId('nav-forums')).toBeVisible();
      await expect(page.getByTestId('nav-about')).toBeVisible();
    });

    test('should redirect to login for protected routes', async ({ page }) => {
      await page.goto('/createPost');
      await expect(page.getByTestId('login-page')).toBeVisible();

      await page.goto('/profile');
      await expect(page.getByTestId('login-page')).toBeVisible();
    });

    test('should show navigation elements', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('nav-posts')).toBeVisible();
      await expect(page.getByTestId('nav-forums')).toBeVisible();
      await expect(page.getByTestId('nav-about')).toBeVisible();
    });

    test('should show mobile menu on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await expect(page.getByTestId('mobile-menu-button')).toBeVisible();
      await page.getByTestId('mobile-menu-button').click();
      await expect(page.getByTestId('mobile-menu')).toBeVisible();
      await page.getByTestId('mobile-menu-button').click();
      await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
    });

    test('should toggle language', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('language-toggle')).toBeVisible();
      await page.getByTestId('language-toggle').click();
    });

    test('should show main page content', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('main-page')).toBeVisible();
      await expect(page.getByTestId('posts-grid')).toBeVisible();
      await expect(page.getByTestId('search-bar')).toBeVisible();
    });
  });
}); 