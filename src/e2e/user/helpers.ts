import { chromium, Browser, Page } from 'playwright';
import { TEST_CONFIG } from './config';
import { UserTestData } from './types';

export class UserTestHelpers {
  static async createBrowser(): Promise<Browser> {
    return await chromium.launch({
      headless: TEST_CONFIG.headless,
      slowMo: TEST_CONFIG.slowMo,
    });
  }

  static async createPage(browser: Browser): Promise<Page> {
    const context = await browser.newContext();
    const page = await context.newPage();
    return page;
  }

  static async takeScreenshot(page: Page, name: string): Promise<void> {
    if (TEST_CONFIG.screenshots.enabled) {
      await page.screenshot({ 
        path: `${TEST_CONFIG.screenshots.path}${name}.png`,
        fullPage: true 
      });
    }
  }

  static async fillUserForm(page: Page, userData: UserTestData): Promise<void> {
    await page.locator('input').first().fill(userData.name);
    await page.locator('input').nth(1).fill(userData.email);
    
    // Handle role selection
    const selectField = page.locator('select').first();
    if (await selectField.isVisible()) {
      await selectField.selectOption(userData.role);
    } else {
      // Custom select component
      await page.click('[role="combobox"]');
      const roleMap: Record<string, string> = {
        admin: '管理者',
        editor: '編集者', 
        viewer: '閲覧者'
      };
      await page.click(`text=${roleMap[userData.role]}`);
    }
  }

  static async navigateToUsers(page: Page): Promise<void> {
    await page.goto(`${TEST_CONFIG.baseUrl}/users`);
    await page.waitForLoadState('networkidle');
  }

  static async navigateToCreateUser(page: Page): Promise<void> {
    await page.click('a[href="/users/new"]');
    await page.waitForLoadState('networkidle');
  }

  static async submitForm(page: Page, buttonText: string = '作成'): Promise<void> {
    await page.click(`button:has-text("${buttonText}")`);
    await page.waitForLoadState('networkidle');
  }

  static async openUserMenu(page: Page, userName: string): Promise<void> {
    const userRow = page.locator(`tr:has-text("${userName}")`);
    await userRow.locator('button[aria-haspopup="menu"]').click();
  }

  static async clickMenuItem(page: Page, menuText: string): Promise<void> {
    await page.click(`text=${menuText}`);
    await page.waitForLoadState('networkidle');
  }

  static async verifyUserExists(page: Page, userName: string): Promise<boolean> {
    await page.waitForSelector('table');
    return await page.locator(`text=${userName}`).isVisible();
  }

  static async verifyUserRole(page: Page, userName: string, role: string): Promise<boolean> {
    const userRow = page.locator(`tr:has-text("${userName}")`);
    return await userRow.locator(`text=${role}`).isVisible();
  }
}