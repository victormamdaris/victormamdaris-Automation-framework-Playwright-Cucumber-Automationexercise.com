import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { HomePage } from '@pages/ui/home/home.page';
import { LoginPage } from '@pages/ui/authentication/login.page';
import { SignupPage } from '@pages/ui/authentication/signup.page';
import { FileHelper } from '@helpers/file-helper';
import { MemoryKeys } from '../../../../support/screenplay/Memory';

// ============================================================================
// Background Steps
// ============================================================================
// Note: 'a registered user exists' step is defined in cart.steps.ts to avoid duplication

Given('the user is on the login page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
  
  // Navigate to login page
  await homePage.clickSignupLogin();
  await this.page.waitForTimeout(1000);
});

When('the user logs in with valid credentials', { timeout: 25000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const loginPage = new LoginPage(this.page);
  
  // Navigate to login page
  await homePage.clickSignupLogin();
  await this.page.waitForTimeout(1000);
  
  // Use credentials from created user (created via API in Background)
  const createdUser = this.actor.recall<any>(MemoryKeys.CREATED_USER);
  if (createdUser) {
    await loginPage.login(createdUser.email, createdUser.password);
  } else {
    // Fallback: use test data file
    const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
    await loginPage.login(userData.validUser.email, userData.validUser.password);
  }
  await this.page.waitForTimeout(2000);
});

When('the user attempts to log in with invalid credentials', { timeout: 15000 }, async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  
  // Ensure we're on the login page
  await this.page.waitForSelector('[data-qa="login-email"]', { state: 'visible', timeout: 5000 });
  await this.page.waitForTimeout(1000);
  
  await loginPage.login('invalid@test.com', 'WrongPassword123');
  await this.page.waitForTimeout(2000);
});

When('the user attempts to log in with email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(email, password);
  await this.page.waitForTimeout(1000);
});

When('the user logs out', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickLogout();
  await this.page.waitForTimeout(1000);
});

// ============================================================================
// Then Steps - Assertions (Outcome-Based)
// ============================================================================

/**
 * Outcome: The user is authenticated
 */
Then('the user is authenticated', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const signupPage = new SignupPage(this.page);
  
  // If on "Account Created" page after registration, click Continue first
  const isAccountCreatedPage = await this.page.isVisible('text=Account Created!');
  if (isAccountCreatedPage) {
    await signupPage.clickContinue();
    await this.page.waitForTimeout(2000);
  }
  
  await this.page.waitForTimeout(2000);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

/**
 * Outcome: The user is logged out
 */
Then('the user is logged out', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await this.page.waitForTimeout(1000);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeFalsy();
});

/**
 * Outcome: The login page is displayed
 */
Then('the login page is displayed', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await this.page.waitForTimeout(1000);
  const isLoginFormVisible = await loginPage.isLoginFormVisible();
  expect(isLoginFormVisible).toBeTruthy();
});

// ============================================================================
// Legacy Steps - Kept for backward compatibility
// ============================================================================

Then('the user is authenticated successfully', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await this.page.waitForTimeout(2000);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Then('the user\'s name is displayed in the header', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const username = await homePage.getLoggedInUsername();
  expect(username).toBeTruthy();
});

Then('an error message is displayed indicating incorrect credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  const isErrorVisible = await loginPage.isIncorrectLoginMessageDisplayed();
  expect(isErrorVisible).toBeTruthy();
});

Then('the login attempt fails', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  const isLoginFormVisible = await loginPage.isLoginFormVisible();
  expect(isLoginFormVisible).toBeTruthy();
});

Then('the user remains on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  const isLoginFormVisible = await loginPage.isLoginFormVisible();
  expect(isLoginFormVisible).toBeTruthy();
});

Then('the user is redirected to the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await this.page.waitForTimeout(1000);
  const isLoginFormVisible = await loginPage.isLoginFormVisible();
  expect(isLoginFormVisible).toBeTruthy();
});

Then('the user is no longer authenticated', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await this.page.waitForTimeout(1000);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeFalsy();
});

// ============================================================================
// Legacy Steps - Keep for backward compatibility during transition
// ============================================================================

Given('I am on the home page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
});

When('I navigate to login page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickSignupLogin();
});

When('I login with valid credentials', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  await homePage.clickSignupLogin();
  
  const loginPage = new LoginPage(this.page);
  
  // Use credentials from created user (created via API in Background)
  const createdUser = this.actor.recall<any>(MemoryKeys.CREATED_USER);
  if (createdUser) {
    await loginPage.login(createdUser.email, createdUser.password);
  } else {
    // Fallback: use test data file
    const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
    await loginPage.login(userData.validUser.email, userData.validUser.password);
  }
});

When('I login with invalid email and password', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  await homePage.clickSignupLogin();
  
  const loginPage = new LoginPage(this.page);
  await loginPage.login('invalid@test.com', 'WrongPassword123');
});

When('I enter email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  await homePage.clickSignupLogin();
  
  const loginPage = new LoginPage(this.page);
  await loginPage.login(email, password);
});

When('I click on login button', async function (this: CustomWorld) {
  // Already clicked in login method
});

When('I click on logout', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickLogout();
});

Then('I should be logged in successfully', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await this.page.waitForTimeout(2000);
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Then('I should see my username in the header', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const username = await homePage.getLoggedInUsername();
  expect(username).toBeTruthy();
});

Then('I should see an error message {string}', async function (this: CustomWorld, expectedMessage: string) {
  await this.page.waitForTimeout(1000);
  const loginPage = new LoginPage(this.page);
  const isErrorVisible = await loginPage.isIncorrectLoginMessageDisplayed();
  expect(isErrorVisible).toBeTruthy();
});

Then('I should remain on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  const isLoginFormVisible = await loginPage.isLoginFormVisible();
  expect(isLoginFormVisible).toBeTruthy();
});

Then('I should be redirected to login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await this.page.waitForTimeout(1000);
  const isLoginFormVisible = await loginPage.isLoginFormVisible();
  expect(isLoginFormVisible).toBeTruthy();
});

