import { createUserAndLogin } from '../../steps/authSteps';
import { 
  verifyNonLoggedUserNavigation, 
  verifyLoggedUserNavigation, 
  verifyMobileNavigationNonLogged, 
  verifyMobileNavigationLogged,
  logoutUser 
} from '../../steps/navigationSteps';
import { 
  verifyMainPage, 
  verifyForumsPage, 
  verifyHeartIconsOnPosts, 
  verifyHeartIconsOnForums,
  verifyProtectedRouteAccess 
} from '../../steps/pageSteps';
import { createTestDataTracker } from '../../helpers/testDataTracker';

test.describe('POM Example Tests - Demonstrating Page Object Model and Step Reuse', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  test.describe('Non-Logged User Behavior', () => {
    test('should show correct navigation for non-logged user', async ({ page }) => {
      await page.goto('/');
      await verifyNonLoggedUserNavigation(page);
    });

    test('should show correct mobile navigation for non-logged user', async ({ page }) => {
      await page.goto('/');
      await verifyMobileNavigationNonLogged(page);
    });

    test('should be able to navigate to public pages', async ({ page }) => {
      await verifyMainPage(page);
      await verifyForumsPage(page);
    });
  });

  test.describe('Logged User Behavior', () => {
    test('should show correct navigation for logged user', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await verifyLoggedUserNavigation(page, credentials.username);
    });

    test('should show correct mobile navigation for logged user', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await verifyMobileNavigationLogged(page, credentials.username);
    });

    test('should be able to access protected routes', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await verifyProtectedRouteAccess(page);
    });

    test('should show heart icons on posts and forums', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await verifyHeartIconsOnPosts(page);
      await verifyHeartIconsOnForums(page);
    });

    test('should logout successfully', async ({ page }) => {
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      await logoutUser(page);
    });
  });

  test.describe('Complete User Journey', () => {
    test('should complete full user journey using POM', async ({ page }) => {
      await page.goto('/');
      await verifyNonLoggedUserNavigation(page);
      
      const credentials = await createUserAndLogin(page);
      tracker.trackUser(credentials.username);
      
      await verifyLoggedUserNavigation(page, credentials.username);
      await verifyMainPage(page);
      await verifyForumsPage(page);
      await verifyProtectedRouteAccess(page);
      await verifyHeartIconsOnPosts(page);
      await verifyHeartIconsOnForums(page);
      await logoutUser(page);
      await verifyNonLoggedUserNavigation(page);
    });
  });
}); 