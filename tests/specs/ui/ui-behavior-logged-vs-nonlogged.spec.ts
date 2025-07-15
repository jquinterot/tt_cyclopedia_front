import { signupAndLoginStep } from '../../steps/authSteps';
import { createTestDataTracker } from '../../helpers/testDataTracker';
import { test, expect } from '@playwright/test';

test.describe('UI Behavior: Logged vs Non-Logged Users', () => {
  let tracker: ReturnType<typeof createTestDataTracker>;

  test.beforeEach(() => {
    tracker = createTestDataTracker();
  });

  test.afterEach(async () => {
    await tracker.cleanup();
  });

  // ... rest of the file remains unchanged ...

}); 