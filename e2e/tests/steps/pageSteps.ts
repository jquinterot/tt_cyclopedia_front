import { Page, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { ForumsPage } from '../pages/ForumsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { CreatePostPage } from '../pages/CreatePostPage';

export async function verifyMainPage(page: Page) {
  const mainPage = new MainPage(page);
  await mainPage.goto();
  await expect(mainPage.mainPage).toBeVisible();
}

export async function verifyForumsPage(page: Page) {
  const forumsPage = new ForumsPage(page);
  await forumsPage.goto();
  await expect(forumsPage.forumsPage).toBeVisible();
}

export async function verifyProfilePage(page: Page) {
  const profilePage = new ProfilePage(page);
  await profilePage.goto();
  await expect(profilePage.profilePage).toBeVisible();
}

export async function verifyCreatePostPage(page: Page) {
  const createPostPage = new CreatePostPage(page);
  await createPostPage.goto();
  await expect(createPostPage.createPostForm).toBeVisible();
}

export async function verifyHeartIconsOnPosts(page: Page) {
  const mainPage = new MainPage(page);
  await mainPage.goto();
  await expect(mainPage.mainPage).toBeVisible();

  await mainPage.waitForPostsToLoad();

  const buttonCount = await mainPage.getLikeButtonCount();
  
  if (buttonCount > 0) {
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const likeButtons = await mainPage.getLikeButtons();
      const button = likeButtons.nth(i);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }
  }
}

export async function verifyHeartIconsOnForums(page: Page) {
  const forumsPage = new ForumsPage(page);
  await forumsPage.goto();
  await expect(forumsPage.forumsPage).toBeVisible();

  await forumsPage.waitForForumsToLoad();

  const buttonCount = await forumsPage.getForumLikeButtonCount();
  
  if (buttonCount > 0) {
    const likeButtons = await forumsPage.getForumLikeButtons();
    const firstButton = likeButtons.first();
    await expect(firstButton).toBeVisible();
    await expect(firstButton).toBeEnabled();
  }
}

export async function verifyProtectedRouteAccess(page: Page) {
  await verifyCreatePostPage(page);
  await verifyProfilePage(page);
} 