import { TestData } from '../enums/TestTypes';

export interface TestCredentials {
  username: string;
  email: string;
  password: string;
}

export class TestDataHelper {
  static generateUniqueUsername(prefix: string = TestData.VALID_USERNAME): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  }

  static generateUniqueEmail(prefix: string = 'test'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5);
    return `${prefix}_${timestamp}_${random}@example.com`;
  }

  static generateTestCredentials(prefix?: string): TestCredentials {
    const username = this.generateUniqueUsername(prefix);
    const email = this.generateUniqueEmail(prefix);
    return {
      username,
      email,
      password: TestData.VALID_PASSWORD
    };
  }

  static getValidCredentials(): TestCredentials {
    return {
      username: TestData.VALID_USERNAME,
      email: TestData.VALID_EMAIL,
      password: TestData.VALID_PASSWORD
    };
  }

  static getInvalidCredentials(): TestCredentials {
    return {
      username: TestData.VALID_USERNAME,
      email: TestData.INVALID_EMAIL,
      password: TestData.INVALID_PASSWORD
    };
  }

  static generatePostData(): { title: string; content: string } {
    const timestamp = Date.now();
    return {
      title: `Test Post ${timestamp}`,
      content: `This is a test post content created at ${new Date(timestamp).toISOString()}`
    };
  }

  static generateForumData(): { title: string; description: string } {
    const timestamp = Date.now();
    return {
      title: `Test Forum ${timestamp}`,
      description: `This is a test forum description created at ${new Date(timestamp).toISOString()}`
    };
  }
} 