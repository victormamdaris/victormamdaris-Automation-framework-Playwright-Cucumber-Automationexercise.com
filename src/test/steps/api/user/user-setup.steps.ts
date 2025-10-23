import { Given } from '@cucumber/cucumber';
import { request } from '@playwright/test';

/**
 * Given: User account exists with email
 */
Given('a user account exists with email {string}', async function (email: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  
  // Create account if it doesn't exist
  const userData = {
    name: 'Test User',
    email: email,
    password: 'Test@123',
    title: 'Mr',
    birth_date: '15',
    birth_month: '5',
    birth_year: '1990',
    firstname: 'Test',
    lastname: 'User',
    company: 'Test Company',
    address1: '123 Test St',
    country: 'United States',
    zipcode: '12345',
    state: 'California',
    city: 'Los Angeles',
    mobile_number: '1234567890'
  };
  
  console.log(`\n🔧 SETUP: Creating test user account (${email})`);
  
  try {
    const context = await request.newContext();
    const response = await context.post(`${baseUrl}/api/createAccount`, {
      form: userData
    });
    const body = await response.json();
    await context.dispose();
    
    // Store user data for later use
    this.testUserData = userData;
    
    console.log(`  Result: ${body.message || 'Created or already exists'}`);
  } catch (error) {
    console.log('  User may already exist, continuing...');
  }
});

/**
 * Given: User account exists with credentials
 */
Given('a user account exists with credentials:', async function (dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const credentials = dataTable.rowsHash();
  
  // Create account with provided credentials
  const userData = {
    name: 'Test User',
    email: credentials.email,
    password: credentials.password,
    title: 'Mr',
    birth_date: '15',
    birth_month: '5',
    birth_year: '1990',
    firstname: 'Test',
    lastname: 'User',
    company: 'Test Company',
    address1: '123 Test St',
    country: 'United States',
    zipcode: '12345',
    state: 'California',
    city: 'Los Angeles',
    mobile_number: '1234567890'
  };
  
  console.log(`\n🔧 SETUP: Creating test user account`);
  console.log(`  Email: ${credentials.email}`);
  
  try {
    const context = await request.newContext();
    const response = await context.post(`${baseUrl}/api/createAccount`, {
      form: userData
    });
    const body = await response.json();
    await context.dispose();
    
    // Store user data for later use
    this.testUserData = userData;
    
    console.log(`  Result: ${body.message || 'Created or already exists'}`);
  } catch (error) {
    console.log('  User may already exist, continuing...');
  }
});
