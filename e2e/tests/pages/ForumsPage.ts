import { Page, Locator } from '@playwright/test';

export class ForumsPage {
  readonly page: Page;
  readonly forumsPage: Locator;
  readonly forumsGrid: Locator;
  readonly searchBar: Locator;
  readonly createForumButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.forumsPage = page.getByTestId('forums-page');
    this.forumsGrid = page.getByTestId('forums-grid');
    this.searchBar = page.getByTestId('forums-search-bar');
    this.createForumButton = page.getByTestId('create-forum-button');
  }

  async goto() {
    await this.page.goto('/forums');
  }

  async waitForForumsToLoad(timeout = 5000) {
    await this.page.waitForTimeout(timeout);
  }

  async getForumLikeButtons() {
    return this.page.locator('[data-testid*="like-button"]');
  }

  async getForumLikeButtonCount() {
    const likeButtons = await this.getForumLikeButtons();
    return await likeButtons.count();
  }

  async clickForumLikeButton(index = 0) {
    const likeButtons = await this.getForumLikeButtons();
    await likeButtons.nth(index).click();
  }

  async searchForums(query: string) {
    await this.searchBar.fill(query);
    await this.searchBar.press('Enter');
  }

  async clickCreateForum() {
    await this.createForumButton.click();
  }
} 