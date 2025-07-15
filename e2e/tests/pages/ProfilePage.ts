import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly profilePage: Locator;
  readonly username: Locator;
  readonly email: Locator;
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profilePage = page.getByTestId('profile-page');
    this.username = page.getByTestId('profile-username');
    this.email = page.getByTestId('profile-email');
    this.editButton = page.getByTestId('profile-edit-button');
    this.saveButton = page.getByTestId('profile-save-button');
    this.cancelButton = page.getByTestId('profile-cancel-button');
  }

  async goto() {
    await this.page.goto('/profile');
  }

  async getUsername() {
    return await this.username.textContent();
  }

  async getEmail() {
    return await this.email.textContent();
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
} 