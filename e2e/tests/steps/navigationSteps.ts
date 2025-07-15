import { Page, expect } from '@playwright/test';
import { NavBar } from '../pages/NavBar';

export async function verifyNonLoggedUserNavigation(page: Page) {
  const navBar = new NavBar(page);
  
  await expect(navBar.navLogin).toBeVisible();
  await expect(navBar.navLogin).toHaveText('Sign In');
  await expect(navBar.userProfile).not.toBeVisible();
  await expect(navBar.createPostButton).not.toBeVisible();
  await expect(navBar.navPosts).toBeVisible();
  await expect(navBar.navForums).toBeVisible();
  await expect(navBar.navAbout).toBeVisible();
}

export async function verifyLoggedUserNavigation(page: Page, username: string) {
  const navBar = new NavBar(page);
  
  await expect(navBar.navLogin).not.toBeVisible();
  await expect(navBar.userProfile).toBeVisible();
  await expect(navBar.userProfileTrigger).toBeVisible();
  await expect(navBar.userProfileTrigger).toContainText(username);
  await expect(navBar.createPostButton).toBeVisible();
  await expect(navBar.createPostButton).toHaveText('Create Post');
  await expect(navBar.navPosts).toBeVisible();
  await expect(navBar.navForums).toBeVisible();
  await expect(navBar.navAbout).toBeVisible();
}

export async function verifyMobileNavigationNonLogged(page: Page) {
  const navBar = new NavBar(page);
  
  await navBar.setMobileViewport();
  await navBar.openMobileMenu();
  await expect(navBar.mobileMenu).toBeVisible();
  await expect(navBar.mobileNavLogin).toBeVisible();
  await expect(navBar.mobileNavLogin).toHaveText('Sign In');
  await expect(navBar.mobileUserProfileDropdown).not.toBeVisible();
  await expect(navBar.mobileNavPosts).toBeVisible();
  await expect(navBar.mobileNavForums).toBeVisible();
  await expect(navBar.mobileNavAbout).toBeVisible();
}

export async function verifyMobileNavigationLogged(page: Page, username: string) {
  const navBar = new NavBar(page);
  
  await navBar.setMobileViewport();
  await navBar.openMobileMenu();
  await expect(navBar.mobileMenu).toBeVisible();
  await expect(navBar.mobileNavLogin).not.toBeVisible();
  await expect(navBar.mobileUserProfileDropdown).toBeVisible();
  await expect(navBar.mobileUsername).toContainText(username);
  await expect(navBar.mobileDropdownProfileLink).toBeVisible();
  await expect(navBar.mobileDropdownLogoutButton).toBeVisible();
}

export async function logoutUser(page: Page) {
  const navBar = new NavBar(page);
  
  await expect(navBar.userProfile).toBeVisible();
  await navBar.openUserProfileDropdown();
  await expect(navBar.userProfileDropdownMenu).toBeVisible();
  await navBar.logout();
  await expect(navBar.navLogin).toBeVisible();
  await expect(navBar.userProfile).not.toBeVisible();
  await expect(navBar.createPostButton).not.toBeVisible();
} 