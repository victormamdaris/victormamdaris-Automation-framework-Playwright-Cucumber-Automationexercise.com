import { Page } from '@playwright/test';
import { BasePage } from '@core/base-page';
import { HomePageLocators } from '@locators/ui/home-page.locators';
import config from '@config/environment.config';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo(config.environment.baseUrl);
  }

  async clickProducts(): Promise<void> {
    await this.click(HomePageLocators.PRODUCTS_LINK);
  }

  async clickCart(): Promise<void> {
    await this.click(HomePageLocators.CART_LINK);
  }

  async clickSignupLogin(): Promise<void> {
    await this.click(HomePageLocators.SIGNUP_LOGIN_LINK);
  }

  async clickLogout(): Promise<void> {
    await this.click(HomePageLocators.LOGOUT_LINK);
  }

  async clickDeleteAccount(): Promise<void> {
    await this.click(HomePageLocators.DELETE_ACCOUNT_LINK);
  }

  async clickContactUs(): Promise<void> {
    await this.click(HomePageLocators.CONTACT_US_LINK);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(HomePageLocators.LOGGED_IN_USER);
  }

  async getLoggedInUsername(): Promise<string> {
    const text = await this.getText(HomePageLocators.LOGGED_IN_USER);
    return text.replace('Logged in as ', '').trim();
  }

  async subscribeToNewsletter(email: string): Promise<void> {
    await this.scrollToElement(HomePageLocators.SUBSCRIPTION_EMAIL);
    await this.fill(HomePageLocators.SUBSCRIPTION_EMAIL, email);
    await this.click(HomePageLocators.SUBSCRIPTION_BUTTON);
  }

  async isSubscriptionSuccessful(): Promise<boolean> {
    return await this.isVisible(HomePageLocators.SUCCESS_SUBSCRIBE_MESSAGE);
  }

  async verifyHomePageLoaded(): Promise<boolean> {
    return await this.isVisible(HomePageLocators.CAROUSEL);
  }
}
