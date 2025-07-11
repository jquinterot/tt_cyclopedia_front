import { Page, expect } from '@playwright/test';

export async function expectFormError(page: Page, text: string | RegExp) {
  await expect(page.getByText(text)).toBeVisible();
} 