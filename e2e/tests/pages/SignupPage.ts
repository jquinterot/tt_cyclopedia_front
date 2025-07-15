import { Page, Locator } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly signupPage: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupPage = page.getByTestId('signup-page');
    this.usernameInput = page.getByTestId('signup-username-input');
    this.emailInput = page.getByTestId('signup-email-input');
    this.passwordInput = page.getByTestId('signup-password-input');
    this.confirmPasswordInput = page.getByTestId('signup-confirm-password-input');
    this.submitButton = page.getByTestId('signup-submit');
    this.loginLink = page.getByTestId('login-link');
  }

  async goto() {
    await this.page.goto('/signup');
  }

  async signup(username: string, email: string, password: string, confirmPassword?: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword || password);
    await this.submitButton.click();
  }

  async waitForLoginLink(timeout = 7000) {
    await this.page.waitForSelector('[data-testid="login-link"]', { timeout });
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }
} 