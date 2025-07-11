import { Page, expect } from '@playwright/test';
import { signup } from '../helpers/auth';
import { LoginPage } from '../pages/LoginPage';

export async function signupStep(page: Page, username: string, email: string, password: string) {
  await signup(page, { username, email, password });
}

export async function loginStep(page: Page, username: string, password: string) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
}

export async function signupAndLoginStep(page: Page, username: string, email: string, password: string) {
  await signupStep(page, username, email, password);
  await loginStep(page, username, password);
}

export async function expectLoginError(page: Page, text: string | RegExp = /authentication failed|invalid|required/i) {
  await expect(page.getByTestId('login-error')).toBeVisible();
  await expect(page.getByTestId('login-error')).toContainText(text);
} 