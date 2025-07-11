import { Page, Locator } from '@playwright/test';

export class NavBar {
  readonly page: Page;
  readonly userProfileTrigger: Locator;
  readonly logoutButton: Locator;
  readonly loginButton: Locator;
  readonly userProfile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userProfileTrigger = page.getByTestId('user-profile-trigger');
    this.logoutButton = page.getByTestId('profile-button');
    this.loginButton = page.getByTestId('nav-login');
    this.userProfile = page.getByTestId('user-profile');
  }

  async logout() {
    await this.userProfileTrigger.click();
    await this.logoutButton.click();
  }
} 