import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { HomePage } from '@pages/ui/home/home.page';
import { LoginPage } from '@pages/ui/authentication/login.page';
import { SignupPage } from '@pages/ui/authentication/signup.page';
import { FileHelper } from '@helpers/file-helper';

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
  if (this.testData.createdUser) {
    await loginPage.login(this.testData.createdUser.email, this.testData.createdUser.password);
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
