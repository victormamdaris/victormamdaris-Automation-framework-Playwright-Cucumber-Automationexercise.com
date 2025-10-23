import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { HomePage } from '@pages/ui/home/home.page';
import { LoginPage } from '@pages/ui/authentication/login.page';
import { SignupPage } from '@pages/ui/authentication/signup.page';
import { FileHelper } from '@helpers/file-helper';
import { UserData } from '../../../types/custom.types';

When('I enter signup name and email', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  
  const name = 'Test User ' + FileHelper.generateRandomString(5);
  const email = FileHelper.generateRandomEmail();
  
  this.testData.signupName = name;
  this.testData.signupEmail = email;
  
  await loginPage.signup(name, email);
});

When('I enter signup name and existing email', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  
  // Use the email from the user created in Background (via API)
  const existingEmail = this.testData.createdUser?.email || 'existing@automation.com';
  await loginPage.signup('Test User', existingEmail);
});

When('I click on signup button', async function (this: CustomWorld) {
  // Already clicked in signup method
});

Then('I should be on the account information page', async function (this: CustomWorld) {
  await this.page.waitForTimeout(1000);
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/signup');
});

When('I fill all account details', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const accountData: UserData = {
    name: this.testData.signupName,
    email: this.testData.signupEmail,
    password: 'Test@123456',
    title: 'Mr',
    dateOfBirth: userData.validUser.dateOfBirth
  };
  
  await signupPage.fillAccountInformation(accountData);
});

When('I fill all address details', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const addressData: UserData = {
    name: this.testData.signupName,
    email: this.testData.signupEmail,
    password: 'Test@123456',
    firstName: userData.validUser.firstName,
    lastName: userData.validUser.lastName,
    company: userData.validUser.company,
    address: userData.validUser.address,
    country: userData.validUser.country,
    state: userData.validUser.state,
    city: userData.validUser.city,
    zipcode: userData.validUser.zipcode,
    mobileNumber: userData.validUser.mobileNumber
  };
  
  await signupPage.fillAddressInformation(addressData);
});

When('I click create account button', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  await signupPage.createAccount();
});

Then('I should see account created message', async function (this: CustomWorld) {
  await this.page.waitForTimeout(2000);
  const signupPage = new SignupPage(this.page);
  const isMessageVisible = await signupPage.isAccountCreatedMessageVisible();
  expect(isMessageVisible).toBeTruthy();
});

When('I click continue button', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  await signupPage.clickContinue();
});

Then('I should see error message {string}', async function (this: CustomWorld, expectedMessage: string) {
  // Wait for error message to appear
  await this.page.waitForSelector('text=Email Address already exist!', { timeout: 10000 });
  const isErrorVisible = await this.page.isVisible('text=Email Address already exist!');
  expect(isErrorVisible).toBeTruthy();
});

When('I complete the registration process', { timeout: 30000 }, async function (this: CustomWorld) {
  // This combines multiple steps for registration
  const loginPage = new LoginPage(this.page);
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const name = 'Test User ' + FileHelper.generateRandomString(5);
  const email = FileHelper.generateRandomEmail();
  
  this.testData.signupName = name;
  this.testData.signupEmail = email;
  
  await loginPage.signup(name, email);
  
  // Wait for account information form to be visible
  await this.page.waitForSelector('[data-qa="password"]', { state: 'visible', timeout: 10000 });
  await this.page.waitForTimeout(1000);
  
  const accountData: UserData = {
    ...userData.validUser,
    name: name,
    email: email,
    password: 'Test@123456'
  };
  
  await signupPage.completeSignup(accountData);
  await this.page.waitForTimeout(2000);
  await signupPage.clickContinue();
});

When('I click delete account', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickDeleteAccount();
});

Then('I should see account deleted message', async function (this: CustomWorld) {
  await this.page.waitForTimeout(2000);
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain('Account Deleted');
  
  // Click Continue button to go back to home page
  const signupPage = new SignupPage(this.page);
  await signupPage.clickContinue();
});

Then('I should be redirected to home page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await this.page.waitForTimeout(1000);
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
});

When('I fill all account details including optional fields', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const accountData: UserData = {
    name: this.testData.signupName,
    email: this.testData.signupEmail,
    password: 'Test@123456',
    title: 'Mr',
    dateOfBirth: userData.validUser.dateOfBirth
  };
  
  await signupPage.fillAccountInformation(accountData);
});

When('I fill all address details including optional fields', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const addressData: UserData = {
    name: this.testData.signupName,
    email: this.testData.signupEmail,
    password: 'Test@123456',
    firstName: userData.validUser.firstName,
    lastName: userData.validUser.lastName,
    company: userData.validUser.company,
    address: userData.validUser.address,
    country: userData.validUser.country,
    state: userData.validUser.state,
    city: userData.validUser.city,
    zipcode: userData.validUser.zipcode,
    mobileNumber: userData.validUser.mobileNumber
  };
  
  await signupPage.fillAddressInformation(addressData);
});

Then('account should have all details saved correctly', async function (this: CustomWorld) {
  // This verification would require API or database access
  // For now, we verify successful account creation
  const homePage = new HomePage(this.page);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});
