import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page, Dialog } from '@playwright/test';
import { BrowserManager } from '@core/browser-manager';
import { ApiClient } from '@core/api-client';
import { Actor } from '../../support/screenplay/Actor';

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
  public actor!: Actor; // Screenplay Pattern Actor with Memory

  constructor(options: CustomWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    this.page = await BrowserManager.getPage();
    this.actor = new Actor('User', this.page); // Initialize Actor with Memory
    this.apiClient = new ApiClient();
    await this.apiClient.init();
  }

  async initApiOnly(): Promise<void> {
    // Initialize a minimal Actor for API tests (without page)
    // This allows API tests to use Memory for state management
    this.actor = new Actor('ApiUser', null as any);
    this.apiClient = new ApiClient();
    await this.apiClient.init();
  }

  async cleanup(): Promise<void> {
    if (this.actor) {
      this.actor.forgetAll(); // Clear Actor's memory
    }
    await BrowserManager.closeBrowser();
    if (this.apiClient) {
      await this.apiClient.dispose();
    }
  }
}

setWorldConstructor(CustomWorld);
