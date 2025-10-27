import { Page } from '@playwright/test';
import { BasePage } from '@core/base-page';
import { LoginPageLocators } from '@locators/ui/login-page.locators';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.fill(LoginPageLocators.LOGIN_EMAIL, email);
    await this.fill(LoginPageLocators.LOGIN_PASSWORD, password);
    await this.click(LoginPageLocators.LOGIN_BUTTON);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async signup(name: string, email: string): Promise<void> {
    await this.fill(LoginPageLocators.SIGNUP_NAME, name);
    await this.fill(LoginPageLocators.SIGNUP_EMAIL, email);
    await this.click(LoginPageLocators.SIGNUP_BUTTON);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.isVisible(LoginPageLocators.LOGIN_FORM_TITLE);
  }

  async isSignupFormVisible(): Promise<boolean> {
    return await this.isVisible(LoginPageLocators.SIGNUP_FORM_TITLE);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(LoginPageLocators.ERROR_MESSAGE);
  }

  async isIncorrectLoginMessageDisplayed(): Promise<boolean> {
    return await this.isVisible(LoginPageLocators.INCORRECT_LOGIN_MESSAGE);
  }

  async isEmailExistsMessageDisplayed(): Promise<boolean> {
    return await this.isVisible(LoginPageLocators.EMAIL_EXISTS_MESSAGE);
  }
}
