import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { HomePage } from '@pages/ui/home/home.page';
import { ContactPage } from '@pages/ui/contact/contact.page';
import { FileHelper } from '@helpers/file-helper';
import { ContactData } from '../../../types/custom.types';

When('I navigate to contact us page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickContactUs();
});

Then('I should see {string} heading', async function (this: CustomWorld, expectedHeading: string) {
  const contactPage = new ContactPage(this.page);
  await this.page.waitForTimeout(1000);
  const isVisible = await contactPage.isGetInTouchVisible();
  expect(isVisible).toBeTruthy();
});

When('I fill contact form with valid details', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  
  const contactData: ContactData = {
    name: 'Test User ' + FileHelper.generateRandomString(5),
    email: FileHelper.generateRandomEmail(),
    subject: 'Test Subject',
    message: 'This is a test message for contact form'
  };
  
  this.testData.contactData = contactData;
  await contactPage.fillContactForm(contactData);
});

When('I attach a file to the form', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  const path = require('path');
  
  // Use the permanent test file from testdata folder
  const testFilePath = path.join(process.cwd(), 'testdata', 'sample-upload.txt');
  
  await contactPage.uploadFile(testFilePath);
  await this.page.waitForTimeout(500);
});

When('I submit the contact form', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  
  // Set up handler BEFORE clicking - it will auto-accept when dialog appears
  this.page.once('dialog', async dialog => {
    await dialog.accept();
  });
  
  await contactPage.submitForm();
  await this.page.waitForTimeout(2000);
});

When('I accept the confirmation dialog', { timeout: 30000 }, async function (this: CustomWorld) {
  // Dialog is already accepted by the handler in previous step
  // Just wait for success message to appear
  await this.page.waitForSelector('.status.alert.alert-success', { 
    state: 'visible', 
    timeout: 10000 
  });
  await this.page.waitForTimeout(500);
});

Then('I should see success message', { timeout: 15000 }, async function (this: CustomWorld) {
  // Wait for success message to be visible after form submission
  const contactPage = new ContactPage(this.page);
  const isSuccessVisible = await contactPage.isSuccessMessageVisible();
  expect(isSuccessVisible).toBeTruthy();
});

Then('I can return to home page', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  await contactPage.clickHomeButton();
  await this.page.waitForTimeout(1000);
  
  const homePage = new HomePage(this.page);
  const isHomeLoaded = await homePage.verifyHomePageLoaded();
  expect(isHomeLoaded).toBeTruthy();
});

When('I enter name {string}', async function (this: CustomWorld, name: string) {
  const contactPage = new ContactPage(this.page);
  if (name) {
    await contactPage.fill('[data-qa="name"]', name);
  }
});

When('I enter email {string}', async function (this: CustomWorld, email: string) {
  const contactPage = new ContactPage(this.page);
  if (email) {
    await contactPage.fill('[data-qa="email"]', email);
  }
});

When('I enter subject {string}', async function (this: CustomWorld, subject: string) {
  const contactPage = new ContactPage(this.page);
  if (subject) {
    await contactPage.fill('[data-qa="subject"]', subject);
  }
});

When('I enter message {string}', async function (this: CustomWorld, message: string) {
  const contactPage = new ContactPage(this.page);
  if (message) {
    await contactPage.fill('[data-qa="message"]', message);
  }
});

Then('form should not be submitted', async function (this: CustomWorld) {
  // HTML5 validation should prevent submission
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('contact_us');
});
