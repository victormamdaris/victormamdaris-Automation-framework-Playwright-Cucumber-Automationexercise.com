import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { HomePage } from '@pages/ui/home/home.page';
import { ContactPage } from '@pages/ui/contact/contact.page';
import { FileHelper } from '@helpers/file-helper';
import { ContactData } from '../../../types/custom.types';
import { MemoryKeys } from '../../../../support/screenplay/Memory';

// ============================================================================
// Background Steps
// ============================================================================

Given('the user is on the contact page', { timeout: 15000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
  
  // Navigate to contact us page
  await homePage.clickContactUs();
  await this.page.waitForTimeout(1000);
});

// ============================================================================
// When Steps - Actions
// ============================================================================

When('the user submits a contact request with valid details', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  
  const contactData: ContactData = {
    name: 'Test User ' + FileHelper.generateRandomString(5),
    email: FileHelper.generateRandomEmail(),
    subject: 'Test Subject',
    message: 'This is a test message for contact form'
  };
  
  this.actor.remember(MemoryKeys.CONTACT_DATA, contactData);
  await contactPage.fillContactForm(contactData);
  
  // Set up handler BEFORE clicking - it will auto-accept when dialog appears
  this.page.once('dialog', async dialog => {
    await dialog.accept();
  });
  
  await contactPage.submitForm();
  await this.page.waitForTimeout(2000);
});

When('the user submits a contact request with valid details and a file attachment', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  const path = require('path');
  
  const contactData: ContactData = {
    name: 'Test User ' + FileHelper.generateRandomString(5),
    email: FileHelper.generateRandomEmail(),
    subject: 'Test Subject',
    message: 'This is a test message with file attachment'
  };
  
  this.actor.remember(MemoryKeys.CONTACT_DATA, contactData);
  await contactPage.fillContactForm(contactData);
  
  // Attach file
  const testFilePath = path.join(process.cwd(), 'testdata', 'sample-upload.txt');
  await contactPage.uploadFile(testFilePath);
  await this.page.waitForTimeout(500);
  
  // Set up handler BEFORE clicking
  this.page.once('dialog', async dialog => {
    await dialog.accept();
  });
  
  await contactPage.submitForm();
  await this.page.waitForTimeout(2000);
  
  // Wait for success message
  await this.page.waitForSelector('.status.alert.alert-success', { 
    state: 'visible', 
    timeout: 10000 
  });
});

When('the user attempts to submit a contact form with name {string}, email {string}, subject {string}, and message {string}', async function (this: CustomWorld, name: string, email: string, subject: string, message: string) {
  const contactPage = new ContactPage(this.page);
  
  // Fill only provided fields
  if (name) await contactPage.fill('[data-qa="name"]', name);
  if (email) await contactPage.fill('[data-qa="email"]', email);
  if (subject) await contactPage.fill('[data-qa="subject"]', subject);
  if (message) await contactPage.fill('[data-qa="message"]', message);
  
  // Try to submit (will be prevented by HTML5 validation if fields missing)
  try {
    await contactPage.submitForm();
    await this.page.waitForTimeout(1000);
  } catch (error) {
    // Expected to fail due to validation
  }
});

// ============================================================================
// Then Steps - Assertions
// ============================================================================

Then('a success confirmation is displayed', { timeout: 15000 }, async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  const isSuccessVisible = await contactPage.isSuccessMessageVisible();
  expect(isSuccessVisible).toBeTruthy();
});

/**
 * Declarative: User is returned to the home page
 */
Then('the user is returned to the home page', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  await contactPage.clickHomeButton();
  await this.page.waitForTimeout(1000);
  
  const homePage = new HomePage(this.page);
  const isHomeLoaded = await homePage.verifyHomePageLoaded();
  expect(isHomeLoaded).toBeTruthy();
});

/**
 * Legacy: User can navigate back to the home page
 */
Then('the user can navigate back to the home page', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  await contactPage.clickHomeButton();
  await this.page.waitForTimeout(1000);
  
  const homePage = new HomePage(this.page);
  const isHomeLoaded = await homePage.verifyHomePageLoaded();
  expect(isHomeLoaded).toBeTruthy();
});

/**
 * Declarative: User returns to the home page
 */
When('the user returns to the home page', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  await contactPage.clickHomeButton();
  await this.page.waitForTimeout(1000);
});

/**
 * Declarative: Home page is displayed
 */
Then('the home page is displayed', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const isHomeLoaded = await homePage.verifyHomePageLoaded();
  expect(isHomeLoaded).toBeTruthy();
});

Then('the form submission is rejected', async function (this: CustomWorld) {
  // HTML5 validation should prevent submission
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('contact_us');
});

Then('the user remains on the contact page', async function (this: CustomWorld) {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('contact_us');
});

// ============================================================================
// Legacy Steps - Keep for backward compatibility during transition
// ============================================================================

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
  
  this.actor.remember(MemoryKeys.CONTACT_DATA, contactData);
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

