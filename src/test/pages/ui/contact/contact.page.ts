import { Page } from '@playwright/test';
import { BasePage } from '@core/base-page';
import { ContactPageLocators } from '@locators/ui/contact-page.locators';
import { ContactData } from '../../../types/custom.types';

export class ContactPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillContactForm(contactData: ContactData): Promise<void> {
    await this.fill(ContactPageLocators.NAME_INPUT, contactData.name);
    await this.fill(ContactPageLocators.EMAIL_INPUT, contactData.email);
    await this.fill(ContactPageLocators.SUBJECT_INPUT, contactData.subject);
    await this.fill(ContactPageLocators.MESSAGE_TEXTAREA, contactData.message);
  }

  async uploadFile(filePath: string): Promise<void> {
    const fileInput = this.page.locator(ContactPageLocators.UPLOAD_FILE);
    await fileInput.setInputFiles(filePath);
  }

  async submitForm(): Promise<void> {
    await this.click(ContactPageLocators.SUBMIT_BUTTON);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    // Wait for success message to appear after dialog acceptance
    try {
      await this.page.waitForSelector(ContactPageLocators.SUCCESS_MESSAGE, { 
        state: 'visible', 
        timeout: 10000 
      });
      return true;
    } catch {
      return false;
    }
  }

  async clickHomeButton(): Promise<void> {
    await this.click(ContactPageLocators.HOME_BUTTON);
  }

  async isGetInTouchVisible(): Promise<boolean> {
    return await this.isVisible(ContactPageLocators.GET_IN_TOUCH_TITLE);
  }
}
