import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '@support/custom-world';
import { AuthenticationApiService } from '@services/api/authentication-api.service';
import { UserHelper } from '@helpers/user-helper';
import { LoginPage } from '@pages/ui/authentication/login.page';
import { HomePage } from '@pages/ui/home/home.page';
import { expect } from '@playwright/test';
import { MemoryKeys } from '../../../support/screenplay/Memory';

Given('the user is created', async function (this: CustomWorld) {
  const authService = new AuthenticationApiService(this.apiClient);
  
  // Generate random user data
  const userData = UserHelper.generateRandomUser();
  
  // Create account via API
  const response = await authService.createAccount(userData);
  
  const user = {
    email: userData.email,
    password: userData.password,
    name: userData.name
  };
  
  // Save credentials using Screenplay Pattern (NEW WAY)
  this.actor.remember(MemoryKeys.CREATED_USER, user);
  this.actor.remember('createAccountResponse', response);
  
  // Also save in testData for backwards compatibility (LEGACY)
  this.testData.createdUser = user;
  this.testData.createAccountResponse = response;
});

// This step works as both Given (precondition) and Then (assertion)
// By importing both Given and Then, we can use the same implementation
const loggedInStep = async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  const homePage = new HomePage(this.page);
  
  // Use credentials from created user
  const createdUser = this.actor.recall<any>(MemoryKeys.CREATED_USER);
  if (createdUser) {
    // Navigate to login form
    await homePage.clickSignupLogin();
    await this.page.waitForTimeout(1000);
    
    // Perform login
    await loginPage.login(createdUser.email, createdUser.password);
    await this.page.waitForTimeout(2000);
    
    // Verify logged in
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  } else {
    throw new Error('No user created! Please use "Given the user is created" first');
  }
};

// Step definition for "the user is logged in" - works as precondition (Given) or assertion (Then)
// Note: We only register it once with Given, but Cucumber allows it to be used with any keyword
Given('the user is logged in', { timeout: 30000 }, loggedInStep);
