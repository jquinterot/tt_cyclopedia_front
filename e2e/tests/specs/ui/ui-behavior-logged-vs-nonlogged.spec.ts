import { test, expect } from '@playwright/test';
import { signupAndLoginStep } from '../../steps/authSteps';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('UI Behavior: Logged vs Non-Logged Users', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test.describe('Non-Logged User UI', () => {
    test('should show login button and hide user-specific elements', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('nav-login')).toBeVisible();
      await expect(page.getByTestId('nav-login')).toHaveText('Sign In');
      await expect(page.getByTestId('user-profile')).not.toBeVisible();
      await expect(page.getByTestId('create-post-button')).not.toBeVisible();
      await expect(page.getByTestId('nav-posts')).toBeVisible();
      await expect(page.getByTestId('nav-forums')).toBeVisible();
      await expect(page.getByTestId('nav-about')).toBeVisible();
      await expect(page.getByTestId('language-toggle')).toBeVisible();
    });

    test('should show login button in mobile menu', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId('mobile-menu-button').click();
      await expect(page.getByTestId('mobile-menu')).toBeVisible();
      await expect(page.getByTestId('mobile-nav-login')).toBeVisible();
      await expect(page.getByTestId('mobile-nav-login')).toHaveText('Sign In');
      await expect(page.getByTestId('mobile-user-profile-dropdown')).not.toBeVisible();
      await expect(page.getByTestId('mobile-nav-posts')).toBeVisible();
      await expect(page.getByTestId('mobile-nav-forums')).toBeVisible();
      await expect(page.getByTestId('mobile-nav-about')).toBeVisible();
    });

    test('should redirect to login when trying to access protected routes', async ({ page }) => {
      await page.goto('/createPost');
      await expect(page).toHaveURL('/login');
      await page.goto('/create-forum');
      await expect(page).toHaveURL('/login');
      await page.goto('/profile');
      await expect(page).toHaveURL('/login');
    });

    test('should allow access to public routes', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('main-page')).toBeVisible();
      await page.goto('/about');
      await expect(page.getByTestId('about-page')).toBeVisible();
      await page.goto('/forums');
      await expect(page.getByTestId('forums-page')).toBeVisible();
      await page.goto('/login');
      await expect(page.getByTestId('login-page')).toBeVisible();
      await page.goto('/signup');
      await expect(page.getByTestId('signup-page')).toBeVisible();
    });
  });

  test.describe('Logged User UI', () => {
    test('should show user profile dropdown and hide login button', async ({ page }) => {
      const username = `user${Date.now()}`;
      const email = `${username}@test.com`;
      const password = 'TestPassword123!';
      await signupAndLoginStep(page, username, email, password);
      await expect(page.getByTestId('nav-login')).not.toBeVisible();
      await expect(page.getByTestId('user-profile')).toBeVisible();
      await expect(page.getByTestId('user-profile-trigger')).toBeVisible();
      await expect(page.getByTestId('user-profile-trigger')).toContainText(username);
      await expect(page.getByTestId('create-post-button')).toBeVisible();
      await expect(page.getByTestId('create-post-button')).toHaveText('Create Post');
      await expect(page.getByTestId('nav-posts')).toBeVisible();
      await expect(page.getByTestId('nav-forums')).toBeVisible();
      await expect(page.getByTestId('nav-about')).toBeVisible();
      await expect(page.getByTestId('language-toggle')).toBeVisible();
    });

    test('should show user profile in mobile menu', async ({ page }) => {
      const username = `user${Date.now()}`;
      const email = `${username}@test.com`;
      const password = 'TestPassword123!';
      await signupAndLoginStep(page, username, email, password);
      await page.getByTestId('mobile-menu-button').click();
      await expect(page.getByTestId('mobile-menu')).toBeVisible();
      await expect(page.getByTestId('mobile-nav-login')).not.toBeVisible();
      await expect(page.getByTestId('mobile-user-profile-dropdown')).toBeVisible();
      await expect(page.getByTestId('mobile-username')).toContainText(username);
      await expect(page.getByTestId('mobile-dropdown-profile-link')).toBeVisible();
      await expect(page.getByTestId('mobile-dropdown-logout-button')).toBeVisible();
    });

    test('should allow access to protected routes', async ({ page }) => {
      const username = `user${Date.now()}`;
      const email = `${username}@test.com`;
      const password = 'TestPassword123!';
      await signupAndLoginStep(page, username, email, password);
      await page.goto('/createPost');
      await expect(page.getByTestId('create-post-container')).toBeVisible();
      await page.goto('/profile');
      await expect(page.getByTestId('profile-page')).toBeVisible();
    });

    test('should show user profile dropdown menu when clicked', async ({ page }) => {
      const username = `user${Date.now()}`;
      const email = `${username}@test.com`;
      const password = 'TestPassword123!';
      await signupAndLoginStep(page, username, email, password);
      await page.getByTestId('user-profile-trigger').click();
      await expect(page.getByTestId('user-profile-dropdown-menu')).toBeVisible();
      await expect(page.getByTestId('dropdown-profile-link')).toBeVisible();
      await expect(page.getByTestId('dropdown-profile-link')).toHaveText('Profile');
      await expect(page.getByTestId('profile-button')).toBeVisible();
      await expect(page.getByTestId('profile-button')).toHaveText('Logout');
    });

    test('should logout successfully', async ({ page }) => {
      const username = `user${Date.now()}`;
      const email = `${username}@test.com`;
      const password = 'TestPassword123!';
      await signupAndLoginStep(page, username, email, password);
      await expect(page.getByTestId('user-profile')).toBeVisible();
      await page.getByTestId('user-profile-trigger').click();
      await page.getByTestId('profile-button').click();
      await expect(page.getByTestId('nav-login')).toBeVisible();
      await expect(page.getByTestId('user-profile')).not.toBeVisible();
      await expect(page.getByTestId('create-post-button')).not.toBeVisible();
    });
  });

  test.describe('Navigation Behavior', () => {
    test('should maintain navigation state after login/logout', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('nav-login')).toBeVisible();
      const username = `user${Date.now()}`;
      const email = `${username}@test.com`;
      const password = 'TestPassword123!';
      await signupAndLoginStep(page, username, email, password);
      await expect(page).toHaveURL('/');
      await expect(page.getByTestId('user-profile')).toBeVisible();
      await expect(page.getByTestId('create-post-button')).toBeVisible();
      await page.getByTestId('user-profile-trigger').click();
      await page.getByTestId('profile-button').click();
      await expect(page).toHaveURL('/');
      await expect(page.getByTestId('nav-login')).toBeVisible();
      await expect(page.getByTestId('create-post-button')).not.toBeVisible();
    });
  });
}); 