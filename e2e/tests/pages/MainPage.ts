import { Page, Locator } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly mainPage: Locator;
  readonly postsGrid: Locator;
  readonly searchBar: Locator;
  readonly languageToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainPage = page.getByTestId('main-page');
    this.postsGrid = page.getByTestId('posts-grid');
    this.searchBar = page.getByTestId('search-bar');
    this.languageToggle = page.getByTestId('language-toggle');
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForPostsToLoad(timeout = 10000) {
    await this.page.waitForSelector('[data-testid="posts-grid"]', { timeout });
  }

  async getLikeButtons() {
    return this.page.locator('[data-testid*="like-button"]');
  }

  async getLikeButtonCount() {
    const likeButtons = await this.getLikeButtons();
    return await likeButtons.count();
  }

  async clickLikeButton(index = 0) {
    const likeButtons = await this.getLikeButtons();
    await likeButtons.nth(index).click();
  }

  async searchPosts(query: string) {
    await this.searchBar.fill(query);
    await this.searchBar.press('Enter');
  }

  async toggleLanguage() {
    await this.languageToggle.click();
  }
} 