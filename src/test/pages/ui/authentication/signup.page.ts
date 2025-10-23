import { Page } from '@playwright/test';
import { BasePage } from '@core/base-page';
import { SignupPageLocators } from '@locators/ui/signup-page.locators';
import { UserData } from '../../../types/custom.types';

export class SignupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillAccountInformation(userData: UserData): Promise<void> {
    // Select title
    if (userData.title === 'Mr') {
      await this.click(SignupPageLocators.TITLE_MR);
    } else {
      await this.click(SignupPageLocators.TITLE_MRS);
    }

    // Fill password
    await this.fill(SignupPageLocators.PASSWORD, userData.password);

    // Date of birth
    if (userData.dateOfBirth) {
      await this.selectDropdown(SignupPageLocators.DAY_OF_BIRTH, userData.dateOfBirth.day);
      await this.selectDropdown(SignupPageLocators.MONTH_OF_BIRTH, userData.dateOfBirth.month);
      await this.selectDropdown(SignupPageLocators.YEAR_OF_BIRTH, userData.dateOfBirth.year);
    }

    // Checkboxes
    await this.checkCheckbox(SignupPageLocators.NEWSLETTER_CHECKBOX);
    await this.checkCheckbox(SignupPageLocators.SPECIAL_OFFERS_CHECKBOX);
  }

  async fillAddressInformation(userData: UserData): Promise<void> {
    if (userData.firstName) await this.fill(SignupPageLocators.FIRST_NAME, userData.firstName);
    if (userData.lastName) await this.fill(SignupPageLocators.LAST_NAME, userData.lastName);
    if (userData.company) await this.fill(SignupPageLocators.COMPANY, userData.company);
    if (userData.address) await this.fill(SignupPageLocators.ADDRESS1, userData.address);
    if (userData.address2) await this.fill(SignupPageLocators.ADDRESS2, userData.address2);
    if (userData.country) await this.selectDropdown(SignupPageLocators.COUNTRY, userData.country);
    if (userData.state) await this.fill(SignupPageLocators.STATE, userData.state);
    if (userData.city) await this.fill(SignupPageLocators.CITY, userData.city);
    if (userData.zipcode) await this.fill(SignupPageLocators.ZIPCODE, userData.zipcode);
    if (userData.mobileNumber) await this.fill(SignupPageLocators.MOBILE_NUMBER, userData.mobileNumber);
  }

  async createAccount(): Promise<void> {
    await this.click(SignupPageLocators.CREATE_ACCOUNT_BUTTON);
  }

  async isAccountCreatedMessageVisible(): Promise<boolean> {
    return await this.isVisible(SignupPageLocators.ACCOUNT_CREATED_MESSAGE);
  }

  async clickContinue(): Promise<void> {
    await this.click(SignupPageLocators.CONTINUE_BUTTON);
  }

  async completeSignup(userData: UserData): Promise<void> {
    await this.fillAccountInformation(userData);
    await this.fillAddressInformation(userData);
    await this.createAccount();
    await this.page.waitForTimeout(2000); // Wait for account creation
  }
}
