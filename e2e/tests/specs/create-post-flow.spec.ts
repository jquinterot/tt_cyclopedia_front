import { test, expect } from '@playwright/test';
import { signup } from '../helpers/auth';
import { LoginPage } from '../pages/LoginPage';
import { CreatePostPage } from '../pages/CreatePostPage';

test.describe('Create Post Flow', () => {
  test('should allow a logged-in user to create a post', async ({ page }) => {
    // Sign up a new user
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signup(page, { username, email, password });

    // Log in
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
    await expect(page).toHaveURL('/');

    // Go to create post page and create a post
    const createPostPage = new CreatePostPage(page);
    await createPostPage.goto();
    await expect(createPostPage.createPostContainer).toBeVisible();
    await expect(createPostPage.createPostForm).toBeVisible();
    await createPostPage.createPost('My Playwright Post', 'This is a post created by Playwright.');

    // Wait for success toast
    await expect(page.getByText(/post successfully created/i)).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL('/');
  });
}); 