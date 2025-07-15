import { test, expect } from '@playwright/test';
import { signupAndLoginStep } from '../../steps/authSteps';
import { CreatePostPage } from '../../pages/CreatePostPage';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('Create Post Flow', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test('should allow a logged-in user to create a post', async ({ page }) => {
    const username = `user${Date.now()}`;
    const email = `${username}@test.com`;
    const password = 'TestPassword123!';
    await signupAndLoginStep(page, username, email, password);
    const createPostPage = new CreatePostPage(page);
    await createPostPage.goto();
    await expect(createPostPage.createPostContainer).toBeVisible();
    await expect(createPostPage.createPostForm).toBeVisible();
    await createPostPage.createPost('My Playwright Post', 'This is a post created by Playwright.');
    await expect(page.getByText(/post successfully created/i)).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL('/');
  });
}); 