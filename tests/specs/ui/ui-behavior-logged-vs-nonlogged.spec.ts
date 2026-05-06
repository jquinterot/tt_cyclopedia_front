import { createTestDataTracker } from '../../helpers/testDataTracker';
import { test } from '@playwright/test';

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
