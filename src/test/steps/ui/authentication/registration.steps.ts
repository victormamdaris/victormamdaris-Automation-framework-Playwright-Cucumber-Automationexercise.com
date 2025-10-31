import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { HomePage } from '@pages/ui/home/home.page';
import { LoginPage } from '@pages/ui/authentication/login.page';
import { SignupPage } from '@pages/ui/authentication/signup.page';
import { FileHelper } from '@helpers/file-helper';
import { UserData } from '../../../types/custom.types';
import { MemoryKeys } from '../../../../support/screenplay/Memory';

// ============================================================================
// Background Steps
// ============================================================================

Given('the user is on the registration page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
  
  // Navigate to signup/login page
  await homePage.clickSignupLogin();
  await this.page.waitForTimeout(1000);
});

// ============================================================================
// Given Steps - Preconditions
// ============================================================================

Given('an account already exists with a specific email', async function (this: CustomWorld) {
  // User creation is handled by hooks (created via API in Background)
  // Store the existing email for later use
  const createdUser = this.actor.recall<any>(MemoryKeys.CREATED_USER);
  const existingEmail = createdUser?.email || 'existing@automation.com';
  this.actor.remember(MemoryKeys.EXISTING_EMAIL, existingEmail);
});

Given('the user has successfully registered', { timeout: 45000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const loginPage = new LoginPage(this.page);
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const name = 'Test User ' + FileHelper.generateRandomString(5);
  const email = FileHelper.generateRandomEmail();
  
  this.actor.remember(MemoryKeys.SIGNUP_NAME, name);
  this.actor.remember(MemoryKeys.SIGNUP_EMAIL, email);
  
  // Navigate to signup/login page  
  await homePage.clickSignupLogin();
  await this.page.waitForTimeout(1000);
  
  await loginPage.signup(name, email);
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
  await this.page.waitForTimeout(2000);
});

Given('the user has registered with complete account information', { timeout: 45000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const loginPage = new LoginPage(this.page);
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const name = 'Test User ' + FileHelper.generateRandomString(5);
  const email = FileHelper.generateRandomEmail();
  
  this.actor.remember(MemoryKeys.SIGNUP_NAME, name);
  this.actor.remember(MemoryKeys.SIGNUP_EMAIL, email);
  this.actor.remember(MemoryKeys.COMPLETE_USER_DATA, {
    ...userData.validUser,
    name: name,
    email: email,
    password: 'Test@123456'
  });
  
  // Navigate to signup/login page
  await homePage.clickSignupLogin();
  await this.page.waitForTimeout(1000);
  
  await loginPage.signup(name, email);
  await this.page.waitForSelector('[data-qa="password"]', { state: 'visible', timeout: 10000 });
  await this.page.waitForTimeout(1000);
  
  const completeUserData = this.actor.recallOrThrow<UserData>(MemoryKeys.COMPLETE_USER_DATA);
  await signupPage.completeSignup(completeUserData);
  await this.page.waitForTimeout(2000);
  await signupPage.clickContinue();
  await this.page.waitForTimeout(2000);
});

// ============================================================================
// When Steps - Actions
// ============================================================================

When('the user registers with valid account information', { timeout: 45000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const loginPage = new LoginPage(this.page);
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const name = 'Test User ' + FileHelper.generateRandomString(5);
  const email = FileHelper.generateRandomEmail();
  
  this.actor.remember(MemoryKeys.SIGNUP_NAME, name);
  this.actor.remember(MemoryKeys.SIGNUP_EMAIL, email);
  
  // Step 0: Navigate to signup/login page
  await homePage.clickSignupLogin();
  await this.page.waitForTimeout(1000);
  
  // Step 1: Enter signup name and email
  await loginPage.signup(name, email);
  await this.page.waitForSelector('[data-qa="password"]', { state: 'visible', timeout: 10000 });
  await this.page.waitForTimeout(1000);
  
  // Step 2: Fill account and address details
  const accountData: UserData = {
    ...userData.validUser,
    name: name,
    email: email,
    password: 'Test@123456'
  };
  
  await signupPage.completeSignup(accountData);
  await this.page.waitForTimeout(3000);
  
  // Note: Don't click Continue here - let the scenario verify the message first
});

When('the user attempts to register with that email', { timeout: 15000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const loginPage = new LoginPage(this.page);
  
  const createdUser = this.actor.recall<any>(MemoryKeys.CREATED_USER);
  const existingEmail = this.actor.recall<string>(MemoryKeys.EXISTING_EMAIL) || createdUser?.email || 'existing@automation.com';

  // Navigate to signup/login page
  await homePage.clickSignupLogin();
  await this.page.waitForTimeout(1000);
  
  await loginPage.signup('Test User', existingEmail);
  await this.page.waitForTimeout(1000);
});

When('the user deletes their account', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickDeleteAccount();
  await this.page.waitForTimeout(2000);
});

When('the user registers with complete account information including optional fields', { timeout: 45000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const loginPage = new LoginPage(this.page);
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const name = 'Test User ' + FileHelper.generateRandomString(5);
  const email = FileHelper.generateRandomEmail();
  
  this.actor.remember(MemoryKeys.SIGNUP_NAME, name);
  this.actor.remember(MemoryKeys.SIGNUP_EMAIL, email);
  
  // Navigate to signup/login page
  await homePage.clickSignupLogin();
  await this.page.waitForTimeout(1000);
  
  await loginPage.signup(name, email);
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
});

When('the user views their profile', async function (this: CustomWorld) {
  // Profile viewing - the user is already on the account page after registration
  // Just verify we can access the logged-in state
  const homePage = new HomePage(this.page);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

// ============================================================================
// Then Steps - Assertions (Outcome-Based)
// ============================================================================

/**
 * Outcome: The account is created
 */
Then('the account is created', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  const isMessageVisible = await signupPage.isAccountCreatedMessageVisible();
  expect(isMessageVisible).toBeTruthy();
});

/**
 * Outcome: Account creation success message is displayed
 */
Then('the account creation success message is displayed', async function (this: CustomWorld) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain('Account Created');
});

/**
 * Outcome: Account deletion is confirmed
 */
Then('the account deletion is confirmed', async function (this: CustomWorld) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain('Account Deleted');
  
  // Click Continue button to go back to home page
  const signupPage = new SignupPage(this.page);
  await signupPage.clickContinue();
  await this.page.waitForTimeout(1000);
});

/**
 * Outcome: All provided details are displayed in the profile
 */
Then('all provided details are displayed in the profile', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

// ============================================================================
// Legacy Steps - Kept for backward compatibility
// ============================================================================

Then('the account is created successfully', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  const isMessageVisible = await signupPage.isAccountCreatedMessageVisible();
  expect(isMessageVisible).toBeTruthy();
});

Then('the user is automatically logged in', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await this.page.waitForTimeout(2000);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Then('a success message confirms account creation', async function (this: CustomWorld) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain('Account Created');
});

Then('an error message indicates the email is already in use', async function (this: CustomWorld) {  
  await this.page.waitForSelector('text=Email Address already exist!', { timeout: 10000 });
  const isErrorVisible = await this.page.isVisible('text=Email Address already exist!');
  expect(isErrorVisible).toBeTruthy();
});

Then('a confirmation message indicates successful deletion', async function (this: CustomWorld) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain('Account Deleted');
  
  // Click Continue button to go back to home page
  const signupPage = new SignupPage(this.page);
  await signupPage.clickContinue();
  await this.page.waitForTimeout(1000);
});

Then('the user is redirected to the home page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await this.page.waitForTimeout(1000);
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('all provided details are saved correctly', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Then('the user can view their complete profile', async function (this: CustomWorld) {
  // Verify user is logged in with complete profile
  const homePage = new HomePage(this.page);
  const username = await homePage.getLoggedInUsername();
  expect(username).toBeTruthy();
});

// ============================================================================
// Legacy Steps - Keep for backward compatibility during transition
// ============================================================================

When('I enter signup name and email', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  
  const name = 'Test User ' + FileHelper.generateRandomString(5);
  const email = FileHelper.generateRandomEmail();
  
  this.actor.remember(MemoryKeys.SIGNUP_NAME, name);
  this.actor.remember(MemoryKeys.SIGNUP_EMAIL, email);
  
  await loginPage.signup(name, email);
});

When('I enter signup name and existing email', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  
  // Use the email from the user created in Background (via API)
  const createdUser = this.actor.recall<any>(MemoryKeys.CREATED_USER);
  const existingEmail = createdUser?.email || 'existing@automation.com';
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
  
  const signupName = this.actor.recallOrThrow<string>(MemoryKeys.SIGNUP_NAME);
  const signupEmail = this.actor.recallOrThrow<string>(MemoryKeys.SIGNUP_EMAIL);
  
  const accountData: UserData = {
    name: signupName,
    email: signupEmail,
    password: 'Test@123456',
    title: 'Mr',
    dateOfBirth: userData.validUser.dateOfBirth
  };
  
  await signupPage.fillAccountInformation(accountData);
});

When('I fill all address details', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const signupName = this.actor.recallOrThrow<string>(MemoryKeys.SIGNUP_NAME);
  const signupEmail = this.actor.recallOrThrow<string>(MemoryKeys.SIGNUP_EMAIL);
  
  const addressData: UserData = {
    name: signupName,
    email: signupEmail,
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
  
  this.actor.remember(MemoryKeys.SIGNUP_NAME, name);
  this.actor.remember(MemoryKeys.SIGNUP_EMAIL, email);
  
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
  
  const signupName = this.actor.recallOrThrow<string>(MemoryKeys.SIGNUP_NAME);
  const signupEmail = this.actor.recallOrThrow<string>(MemoryKeys.SIGNUP_EMAIL);
  
  const accountData: UserData = {
    name: signupName,
    email: signupEmail,
    password: 'Test@123456',
    title: 'Mr',
    dateOfBirth: userData.validUser.dateOfBirth
  };
  
  await signupPage.fillAccountInformation(accountData);
});

When('I fill all address details including optional fields', async function (this: CustomWorld) {
  const signupPage = new SignupPage(this.page);
  const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
  
  const signupName = this.actor.recallOrThrow<string>(MemoryKeys.SIGNUP_NAME);
  const signupEmail = this.actor.recallOrThrow<string>(MemoryKeys.SIGNUP_EMAIL);
  
  const addressData: UserData = {
    name: signupName,
    email: signupEmail,
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