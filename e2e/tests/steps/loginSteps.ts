import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function loginWith(page: Page, username: string, password: string) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
} 