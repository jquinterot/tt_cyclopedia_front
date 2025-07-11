import { Page, Locator } from '@playwright/test';

export class CreatePostPage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly contentInput: Locator;
  readonly submitButton: Locator;
  readonly createPostContainer: Locator;
  readonly createPostForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.getByTestId('post-title-input');
    this.contentInput = page.getByTestId('post-content-input');
    this.submitButton = page.getByTestId('submit-button');
    this.createPostContainer = page.getByTestId('create-post-container');
    this.createPostForm = page.getByTestId('create-post-form');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.getByTestId('create-post-button').click();
    await this.createPostForm.isVisible();
  }

  async createPost(title: string, content: string) {
    await this.titleInput.fill(title);
    await this.contentInput.fill(content);
    await this.submitButton.click();
  }
} 