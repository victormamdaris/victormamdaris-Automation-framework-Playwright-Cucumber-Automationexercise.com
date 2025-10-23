import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import config from '@config/environment.config';

export class BrowserManager {
  private static browser: Browser;
  private static context: BrowserContext;
  private static page: Page;

  static async launchBrowser(): Promise<Browser> {
    const browserType = config.browser.browser;
    
    const launchOptions = {
      headless: config.browser.headless,
      slowMo: config.browser.slowMo,
      args: ['--start-maximized', '--start-fullscreen']
    };

    switch (browserType) {
      case 'chromium':
        this.browser = await chromium.launch(launchOptions);
        break;
      case 'firefox':
        this.browser = await firefox.launch(launchOptions);
        break;
      case 'webkit':
        this.browser = await webkit.launch(launchOptions);
        break;
      default:
        this.browser = await chromium.launch(launchOptions);
    }

    return this.browser;
  }

  static async createContext(): Promise<BrowserContext> {
    if (!this.browser) {
      await this.launchBrowser();
    }

    this.context = await this.browser.newContext({
      viewport: null, // Use null for fullscreen
      recordVideo: config.reporting.videoOnFailure ? { dir: 'videos/' } : undefined,
      ignoreHTTPSErrors: true
    });

    return this.context;
  }

  static async createPage(): Promise<Page> {
    if (!this.context) {
      await this.createContext();
    }

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(config.browser.timeout);
    
    return this.page;
  }

  static async getPage(): Promise<Page> {
    if (!this.page) {
      await this.createPage();
    }
    return this.page;
  }

  static async closeBrowser(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null as any;
    }
    if (this.context) {
      await this.context.close();
      this.context = null as any;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null as any;
    }
  }

  static async takeScreenshot(fileName: string): Promise<void> {
    if (this.page) {
      await this.page.screenshot({ 
        path: `screenshots/${fileName}.png`,
        fullPage: true 
      });
    }
  }
}
