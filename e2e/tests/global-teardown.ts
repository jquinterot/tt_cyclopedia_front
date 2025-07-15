import { deleteAllData } from './helpers/teardown';

/**
 * Global teardown function that runs after all Playwright tests
 * This ensures all test data is cleaned up, even if tests fail
 */
async function globalTeardown() {
  console.log('🧹 Running global teardown...');
  
  try {
    // Use nuclear option to ensure all test data is removed
    await deleteAllData();
    console.log('✅ Global teardown completed successfully');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw error to avoid failing the build
    // The cleanup is best effort
  }
}

export default globalTeardown; 