import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '@support/custom-world';
import { AuthenticationApiService } from '@services/api/authentication-api.service';
import { UserHelper } from '@helpers/user-helper';
import { LoginPage } from '@pages/ui/authentication/login.page';

Given('the user is created', async function (this: CustomWorld) {
  const authService = new AuthenticationApiService(this.apiClient);
  
  // Generate random user data
  const userData = UserHelper.generateRandomUser();
  
  // Create account via API
  const response = await authService.createAccount(userData);
  
  // Save credentials in test context for later use
  this.testData.createdUser = {
    email: userData.email,
    password: userData.password,
    name: userData.name
  };
  
  // Store response for verification if needed
  this.testData.createAccountResponse = response;
});

Given('the user is logged in', { timeout: 30000 }, async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  
  // Use credentials from created user
  if (this.testData.createdUser) {
    await loginPage.login(this.testData.createdUser.email, this.testData.createdUser.password);
    await this.page.waitForTimeout(2000);
  } else {
    throw new Error('No user created! Please use "Given the user is created" first');
  }
});
