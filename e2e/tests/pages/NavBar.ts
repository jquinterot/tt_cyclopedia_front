import { Page, Locator } from '@playwright/test';
import { TestIds } from '../enums/TestTypes';
import { ViewportHelper } from '../helpers/viewportHelper';
import { ViewportSize } from '../enums/TestTypes';

export class NavBar {
  readonly page: Page;
  readonly navLogin: Locator;
  readonly userProfile: Locator;
  readonly userProfileTrigger: Locator;
  readonly createPostButton: Locator;
  readonly navPosts: Locator;
  readonly navForums: Locator;
  readonly navAbout: Locator;
  readonly mobileMenuButton: Locator;
  readonly mobileMenu: Locator;
  readonly mobileNavLogin: Locator;
  readonly mobileUserProfileDropdown: Locator;
  readonly mobileUsername: Locator;
  readonly mobileDropdownProfileLink: Locator;
  readonly mobileDropdownLogoutButton: Locator;
  readonly mobileNavPosts: Locator;
  readonly mobileNavForums: Locator;
  readonly mobileNavAbout: Locator;
  readonly userProfileDropdownMenu: Locator;
  readonly dropdownProfileLink: Locator;
  readonly profileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navLogin = page.getByTestId(TestIds.NAV_LOGIN);
    this.userProfile = page.getByTestId(TestIds.USER_PROFILE);
    this.userProfileTrigger = page.getByTestId(TestIds.USER_PROFILE_TRIGGER);
    this.createPostButton = page.getByTestId(TestIds.CREATE_POST_BUTTON);
    this.navPosts = page.getByTestId(TestIds.NAV_POSTS);
    this.navForums = page.getByTestId(TestIds.NAV_FORUMS);
    this.navAbout = page.getByTestId(TestIds.NAV_ABOUT);
    this.mobileMenuButton = page.getByTestId(TestIds.MOBILE_MENU_BUTTON);
    this.mobileMenu = page.getByTestId(TestIds.MOBILE_MENU);
    this.mobileNavLogin = page.getByTestId(TestIds.MOBILE_NAV_LOGIN);
    this.mobileUserProfileDropdown = page.getByTestId(TestIds.MOBILE_USER_PROFILE_DROPDOWN);
    this.mobileUsername = page.getByTestId(TestIds.MOBILE_USERNAME);
    this.mobileDropdownProfileLink = page.getByTestId(TestIds.MOBILE_DROPDOWN_PROFILE_LINK);
    this.mobileDropdownLogoutButton = page.getByTestId(TestIds.MOBILE_DROPDOWN_LOGOUT_BUTTON);
    this.mobileNavPosts = page.getByTestId(TestIds.MOBILE_NAV_POSTS);
    this.mobileNavForums = page.getByTestId(TestIds.MOBILE_NAV_FORUMS);
    this.mobileNavAbout = page.getByTestId(TestIds.MOBILE_NAV_ABOUT);
    this.userProfileDropdownMenu = page.getByTestId(TestIds.USER_PROFILE_DROPDOWN_MENU);
    this.dropdownProfileLink = page.getByTestId(TestIds.DROPDOWN_PROFILE_LINK);
    this.profileButton = page.getByTestId(TestIds.PROFILE_BUTTON);
  }

  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
  }

  async closeMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
  }

  async clickLogin(): Promise<void> {
    await this.navLogin.click();
  }

  async clickCreatePost(): Promise<void> {
    await this.createPostButton.click();
  }

  async openUserProfileDropdown(): Promise<void> {
    await this.userProfileTrigger.click();
  }

  async clickProfile(): Promise<void> {
    await this.dropdownProfileLink.click();
  }

  async logout(): Promise<void> {
    await this.profileButton.click();
  }

  async navigateToPosts(): Promise<void> {
    await this.navPosts.click();
  }

  async navigateToForums(): Promise<void> {
    await this.navForums.click();
  }

  async navigateToAbout(): Promise<void> {
    await this.navAbout.click();
  }

  async setMobileViewport(): Promise<void> {
    await ViewportHelper.setMobileViewport(this.page);
  }

  async setDesktopViewport(): Promise<void> {
    await ViewportHelper.setDesktopViewport(this.page);
  }

  async setViewport(size: ViewportSize): Promise<void> {
    await ViewportHelper.setViewport(this.page, size);
  }
} 