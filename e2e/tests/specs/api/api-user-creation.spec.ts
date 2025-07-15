import { test, expect } from '@playwright/test';
import { createTestUser } from '../../helpers/auth';
import { loginStep } from '../../steps/authSteps';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('API User Creation Tests', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test('should create user via API successfully', async () => {
    const credentials = await createTestUser();
    tracker.trackUser(credentials.username);

    expect(credentials.username).toBeTruthy();
    expect(credentials.email).toBeTruthy();
    expect(credentials.password).toBeTruthy();
  });

  test('should login with API created user', async ({ page }) => {
    const credentials = await createTestUser();
    tracker.trackUser(credentials.username);

    await loginStep(page, credentials.username, credentials.password);

    const userProfile = page.getByTestId('user-profile');
    const loginButton = page.getByTestId('nav-login');

    await expect(userProfile).toBeVisible();
    await expect(loginButton).not.toBeVisible();
  });
}); 