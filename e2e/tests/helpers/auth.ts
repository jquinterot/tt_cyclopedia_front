import { Page } from '@playwright/test';
import axios from 'axios';

export async function signup(page: Page) {
  const username = 'cyclopedia';
  const email = 'cyclopedia@test.com';
  const password = 'pass1234';
  await page.goto('/signup');
  await page.getByTestId('signup-username-input').fill(username);
  await page.getByTestId('signup-email-input').fill(email);
  await page.getByTestId('signup-password-input').fill(password);
  await page.getByTestId('signup-confirm-password-input').fill(password);
  await page.getByTestId('signup-submit').click();
  // Wait for login link to appear (robust for both redirect and no-redirect cases)
  await page.waitForSelector('[data-testid="login-link"]', { timeout: 7000 });
}

export async function signupWithCredentials(page: Page, username: string, email: string, password: string) {
  await page.goto('/signup');
  await page.getByTestId('signup-username-input').fill(username);
  await page.getByTestId('signup-email-input').fill(email);
  await page.getByTestId('signup-password-input').fill(password);
  await page.getByTestId('signup-confirm-password-input').fill(password);
  await page.getByTestId('signup-submit').click();
  // Wait for login link to appear (robust for both redirect and no-redirect cases)
  await page.waitForSelector('[data-testid="login-link"]', { timeout: 7000 });
}

export async function createUserViaAPI(username: string, email: string, password: string) {
  try {
    console.log(`🔄 Creating user via API: ${username}`);
    
    const userData = {
      username,
      password,
      email
    };
    
    console.log('📤 Request data:', JSON.stringify(userData, null, 2));
    
    const response = await axios.post('http://localhost:8000/users', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    });
    
    console.log(`✅ Created user via API: ${username}`);
    console.log('📥 Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to create user via API: ${username}`);
    if (error.response) {
      console.error('📥 Response status:', error.response.status);
      console.error('📥 Response data:', JSON.stringify(error.response.data, null, 2));
      console.error('📥 Response headers:', JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      console.error('📤 Request was made but no response received:', error.request);
    } else {
      console.error('❌ Error setting up request:', error.message);
    }
    throw error;
  }
}

export async function createTestUser() {
  const username = `testuser${Date.now()}`;
  const email = `${username}@test.com`;
  const password = 'TestPassword123!';
  
  await createUserViaAPI(username, email, password);
  
  return { username, email, password };
} 