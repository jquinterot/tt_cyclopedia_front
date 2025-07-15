import { Page } from '@playwright/test';
import { ViewportSize } from '../enums/TestTypes';

export class ViewportHelper {
  static readonly VIEWPORT_SIZES = {
    [ViewportSize.MOBILE]: { width: 375, height: 667 },
    [ViewportSize.TABLET]: { width: 768, height: 1024 },
    [ViewportSize.DESKTOP]: { width: 1280, height: 720 }
  };

  static async setViewport(page: Page, size: ViewportSize): Promise<void> {
    const dimensions = this.VIEWPORT_SIZES[size];
    await page.setViewportSize(dimensions);
  }

  static async setMobileViewport(page: Page): Promise<void> {
    await this.setViewport(page, ViewportSize.MOBILE);
  }

  static async setTabletViewport(page: Page): Promise<void> {
    await this.setViewport(page, ViewportSize.TABLET);
  }

  static async setDesktopViewport(page: Page): Promise<void> {
    await this.setViewport(page, ViewportSize.DESKTOP);
  }

  static isMobileViewport(width: number): boolean {
    return width <= 768;
  }

  static isTabletViewport(width: number): boolean {
    return width > 768 && width <= 1024;
  }

  static isDesktopViewport(width: number): boolean {
    return width > 1024;
  }
} 