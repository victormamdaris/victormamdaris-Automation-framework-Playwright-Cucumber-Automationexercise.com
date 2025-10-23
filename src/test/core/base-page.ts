import { Page, Locator } from '@playwright/test';
import { BrowserManager } from '@core/browser-manager';

export class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = '';
  }

  private getLocatorDescription(locator: string | Locator): string {
    if (typeof locator === 'string') {
      return locator;
    }
    return 'custom locator';
  }

  async navigateTo(url: string): Promise<void> {
    console.log(`📍 Navigating to URL: ${url}`);
    await this.page.goto(url);
    console.log(`✅ Successfully navigated to: ${url}`);
  }

  async click(locator: string | Locator): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`🖱️  Clicking on element: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click();
    console.log(`✅ Successfully clicked: ${locatorDesc}`);
  }

  async fill(locator: string | Locator, text: string): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`✏️  Filling field: ${locatorDesc} with value: "${text}"`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.fill(text);
    console.log(`✅ Successfully filled: ${locatorDesc}`);
  }

  async type(locator: string | Locator, text: string, delay: number = 0): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`⌨️  Typing into field: ${locatorDesc} with value: "${text}" (delay: ${delay}ms)`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.type(text, { delay });
    console.log(`✅ Successfully typed into: ${locatorDesc}`);
  }

  async getText(locator: string | Locator): Promise<string> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`📖 Getting text from element: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const text = await element.textContent() || '';
    console.log(`✅ Retrieved text: "${text}" from: ${locatorDesc}`);
    return text;
  }

  async isVisible(locator: string | Locator): Promise<boolean> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`👁️  Checking visibility of element: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const isVisible = await element.isVisible();
    console.log(`✅ Element visibility: ${isVisible} for: ${locatorDesc}`);
    return isVisible;
  }

  async isEnabled(locator: string | Locator): Promise<boolean> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`🔓 Checking if element is enabled: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const isEnabled = await element.isEnabled();
    console.log(`✅ Element enabled state: ${isEnabled} for: ${locatorDesc}`);
    return isEnabled;
  }

  async waitForElement(locator: string | Locator, timeout: number = 30000): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`⏳ Waiting for element to be visible: ${locatorDesc} (timeout: ${timeout}ms)`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
    console.log(`✅ Element is now visible: ${locatorDesc}`);
  }

  async waitForURL(url: string, timeout: number = 30000): Promise<void> {
    console.log(`⏳ Waiting for URL to match: ${url} (timeout: ${timeout}ms)`);
    await this.page.waitForURL(url, { timeout });
    console.log(`✅ URL matched: ${url}`);
  }

  async selectDropdown(locator: string | Locator, value: string): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`📋 Selecting dropdown option: "${value}" in: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption(value);
    console.log(`✅ Successfully selected: "${value}" in: ${locatorDesc}`);
  }

  async checkCheckbox(locator: string | Locator): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`☑️  Checking checkbox: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    if (!await element.isChecked()) {
      await element.check();
      console.log(`✅ Successfully checked: ${locatorDesc}`);
    } else {
      console.log(`ℹ️  Checkbox already checked: ${locatorDesc}`);
    }
  }

  async uncheckCheckbox(locator: string | Locator): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`☐ Unchecking checkbox: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    if (await element.isChecked()) {
      await element.uncheck();
      console.log(`✅ Successfully unchecked: ${locatorDesc}`);
    } else {
      console.log(`ℹ️  Checkbox already unchecked: ${locatorDesc}`);
    }
  }

  async scrollToElement(locator: string | Locator): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`📜 Scrolling to element: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.scrollIntoViewIfNeeded();
    console.log(`✅ Successfully scrolled to: ${locatorDesc}`);
  }

  async hover(locator: string | Locator): Promise<void> {
    const locatorDesc = this.getLocatorDescription(locator);
    console.log(`👆 Hovering over element: ${locatorDesc}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.hover();
    console.log(`✅ Successfully hovered over: ${locatorDesc}`);
  }

  async getPageTitle(): Promise<string> {
    console.log(`📄 Getting page title`);
    const title = await this.page.title();
    console.log(`✅ Page title: "${title}"`);
    return title;
  }

  async getCurrentURL(): Promise<string> {
    const url = this.page.url();
    console.log(`🔗 Current URL: ${url}`);
    return url;
  }

  async takeScreenshot(fileName: string): Promise<void> {
    console.log(`📸 Taking screenshot: ${fileName}`);
    await BrowserManager.takeScreenshot(fileName);
    console.log(`✅ Screenshot saved: ${fileName}`);
  }

  async reload(): Promise<void> {
    console.log(`🔄 Reloading page`);
    await this.page.reload();
    console.log(`✅ Page reloaded successfully`);
  }

  async goBack(): Promise<void> {
    console.log(`⬅️  Navigating back`);
    await this.page.goBack();
    console.log(`✅ Navigated back successfully`);
  }

  async goForward(): Promise<void> {
    console.log(`➡️  Navigating forward`);
    await this.page.goForward();
    console.log(`✅ Navigated forward successfully`);
  }

  async waitForTimeout(timeout: number): Promise<void> {
    console.log(`⏱️  Waiting for ${timeout}ms`);
    await this.page.waitForTimeout(timeout);
    console.log(`✅ Wait completed`);
  }
}
