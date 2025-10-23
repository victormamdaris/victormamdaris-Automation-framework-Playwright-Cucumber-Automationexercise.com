import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page, Dialog } from '@playwright/test';
import { BrowserManager } from '@core/browser-manager';
import { ApiClient } from '@core/api-client';

export interface CustomWorldOptions extends IWorldOptions {
  page?: Page;
  testData?: any;
  apiClient?: ApiClient;
}

export class CustomWorld extends World {
  public page!: Page;
  public testData: any = {};
  public apiClient!: ApiClient;
  public response: any;
  public responseBody: any;
  public dialogPromise?: Promise<Dialog>;

  constructor(options: CustomWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    this.page = await BrowserManager.getPage();
    this.apiClient = new ApiClient();
    await this.apiClient.init();
  }

  async initApiOnly(): Promise<void> {
    this.apiClient = new ApiClient();
    await this.apiClient.init();
  }

  async cleanup(): Promise<void> {
    await BrowserManager.closeBrowser();
    if (this.apiClient) {
      await this.apiClient.dispose();
    }
  }
}

setWorldConstructor(CustomWorld);
