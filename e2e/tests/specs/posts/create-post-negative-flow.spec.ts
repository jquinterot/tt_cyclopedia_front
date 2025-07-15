import { test, expect } from '@playwright/test';
import { signupAndLoginStep } from '../../steps/authSteps';
import { CreatePostPage } from '../../pages/CreatePostPage';

test.describe('Create Post Negative Scenarios', () => {
  test('should show error for empty title', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
    const createPostPage = new CreatePostPage(page);
    await createPostPage.goto();
    await createPostPage.contentInput.fill('Some content');
    await createPostPage.submitButton.click();
    await expect(page.getByText('Please enter a title')).toBeVisible();
  });

  test('should show error for empty content', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
    const createPostPage = new CreatePostPage(page);
    await createPostPage.goto();
    await createPostPage.titleInput.fill('Some title');
    await createPostPage.submitButton.click();
    await expect(page.getByText('Please enter content')).toBeVisible();
  });

  test('should show error for stat out of range', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
    const createPostPage = new CreatePostPage(page);
    await createPostPage.goto();
    await createPostPage.titleInput.fill('Some title');
    await createPostPage.contentInput.fill('Some content');
    await page.getByLabel(/speed/i).fill('3');
    await createPostPage.submitButton.click();
    await expect(page.getByText(/must be a number between 5 and 10/)).toBeVisible();
  });
}); 