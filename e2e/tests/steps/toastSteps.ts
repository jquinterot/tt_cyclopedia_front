import { Page, expect } from '@playwright/test';

export async function expectToast(page: Page, text: string | RegExp) {
  await expect(page.getByText(text)).toBeVisible({ timeout: 5000 });
} 