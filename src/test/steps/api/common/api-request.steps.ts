import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { APIRequestContext, request } from '@playwright/test';

// ============================================================================
// GIVEN STEPS - Preconditions
// ============================================================================

/**
 * Background: Ensure API base URL is configured
 */
Given('the API base URL is configured', async function () {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  console.log(`\n✓ API Base URL configured: ${baseUrl}`);
  // This is a declarative step that documents the API is ready
  // The actual URL configuration happens via environment variables
});

// ============================================================================
// DECLARATIVE API STEPS - Business-Readable, Third-Person
// ============================================================================

/**
 * Declarative: System receives GET request
 */
When('the system receives a GET request to {string}', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: GET`);
  console.log(`URL: ${url}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const context = await request.newContext();
  this.response = await context.get(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Status Text: ${this.response.statusText()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives POST request with body
 */
When('the system receives a POST request to {string} with body:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  const data = dataTable.rowsHash();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: POST`);
  console.log(`URL: ${url}`);
  console.log(`Body (Form Data):`);
  console.log(JSON.stringify(data, null, 2));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const context = await request.newContext();
  this.response = await context.post(url, { form: data });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives DELETE request
 */
When('the system receives a DELETE request to {string}', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: DELETE`);
  console.log(`URL: ${url}`);
  
  const context = await request.newContext();
  this.response = await context.delete(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives PUT request
 */
When('the system receives a PUT request to {string}', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: PUT`);
  console.log(`URL: ${url}`);
  
  const context = await request.newContext();
  this.response = await context.put(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives POST request with empty body
 */
When('the system receives a POST request to {string} with empty body', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: POST`);
  console.log(`URL: ${url}`);
  console.log(`Body: (empty)`);
  
  const context = await request.newContext();
  this.response = await context.post(url, { form: {} });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives POST request with form data
 */
When('the system receives a POST request to {string} with form data:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  const data = dataTable.rowsHash();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: POST`);
  console.log(`URL: ${url}`);
  console.log(`Form Data:`);
  console.log(JSON.stringify(data, null, 2));
  
  const context = await request.newContext();
  this.response = await context.post(url, { form: data });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives GET request with parameter
 */
When('the system receives a GET request to {string} with parameter:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const params = dataTable.rowsHash();
  
  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}${endpoint}?${queryString}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: GET`);
  console.log(`URL: ${url}`);
  console.log(`Query Parameters:`, JSON.stringify(params, null, 2));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const context = await request.newContext();
  this.response = await context.get(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives GET request without parameters
 */
When('the system receives a GET request to {string} without parameters', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST (No Parameters)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: GET`);
  console.log(`URL: ${url}`);
  
  const context = await request.newContext();
  this.response = await context.get(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives PUT request with form data
 */
When('the system receives a PUT request to {string} with form data:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  const data = dataTable.rowsHash();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: PUT`);
  console.log(`URL: ${url}`);
  console.log(`Form Data:`);
  console.log(JSON.stringify(data, null, 2));
  
  const context = await request.newContext();
  this.response = await context.put(url, { form: data });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Declarative: System receives DELETE request with body
 */
When('the system receives a DELETE request to {string} with body:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  const data = dataTable.rowsHash();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: DELETE`);
  console.log(`URL: ${url}`);
  console.log(`Body (Form Data):`);
  console.log(JSON.stringify(data, null, 2));
  
  const context = await request.newContext();
  this.response = await context.delete(url, { form: data });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

// ============================================================================
// LEGACY/IMPERATIVE API STEPS - Kept for backward compatibility
// ============================================================================

/**
 * Step: Send GET request to endpoint
 */
When('I send GET request to {string}', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: GET`);
  console.log(`URL: ${url}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Create a standalone request context (NO BROWSER NEEDED!)
  const context = await request.newContext();
  this.response = await context.get(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Status Text: ${this.response.statusText()}`);
  console.log(`Headers:`, this.response.headers());
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send GET request with parameters
 */
When('I send GET request to {string} with parameter:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const params = dataTable.rowsHash();
  
  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}${endpoint}?${queryString}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: GET`);
  console.log(`URL: ${url}`);
  console.log(`Query Parameters:`, JSON.stringify(params, null, 2));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const context = await request.newContext();
  this.response = await context.get(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send GET request without parameters
 */
When('I send GET request to {string} without parameters', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST (No Parameters)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: GET`);
  console.log(`URL: ${url}`);
  
  const context = await request.newContext();
  this.response = await context.get(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send POST request to endpoint
 */
When('I send POST request to {string}', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: POST`);
  console.log(`URL: ${url}`);
  console.log(`Body: (empty)`);
  
  const context = await request.newContext();
  this.response = await context.post(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send POST request with body parameters
 */
When('I send POST request to {string} with body:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  const data = dataTable.rowsHash();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: POST`);
  console.log(`URL: ${url}`);
  console.log(`Body (Form Data):`);
  console.log(JSON.stringify(data, null, 2));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const context = await request.newContext();
  this.response = await context.post(url, { form: data });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send POST request with form data
 */
When('I send POST request to {string} with form data:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  const data = dataTable.rowsHash();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: POST`);
  console.log(`URL: ${url}`);
  console.log(`Form Data:`);
  console.log(JSON.stringify(data, null, 2));
  
  const context = await request.newContext();
  this.response = await context.post(url, { form: data });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send POST request with empty body
 */
When('I send POST request to {string} with empty body', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: POST`);
  console.log(`URL: ${url}`);
  console.log(`Body: (empty)`);
  
  const context = await request.newContext();
  this.response = await context.post(url, { form: {} });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send PUT request to endpoint
 */
When('I send PUT request to {string}', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: PUT`);
  console.log(`URL: ${url}`);
  
  const context = await request.newContext();
  this.response = await context.put(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send PUT request with form data
 */
When('I send PUT request to {string} with form data:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  const data = dataTable.rowsHash();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: PUT`);
  console.log(`URL: ${url}`);
  console.log(`Form Data:`);
  console.log(JSON.stringify(data, null, 2));
  
  const context = await request.newContext();
  this.response = await context.put(url, { form: data });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send DELETE request to endpoint
 */
When('I send DELETE request to {string}', async function (endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: DELETE`);
  console.log(`URL: ${url}`);
  
  const context = await request.newContext();
  this.response = await context.delete(url);
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Step: Send DELETE request with body
 */
When('I send DELETE request to {string} with body:', async function (endpoint: string, dataTable: any) {
  const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
  const url = `${baseUrl}${endpoint}`;
  const data = dataTable.rowsHash();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: DELETE`);
  console.log(`URL: ${url}`);
  console.log(`Body (Form Data):`);
  console.log(JSON.stringify(data, null, 2));
  
  const context = await request.newContext();
  this.response = await context.delete(url, { form: data });
  this.responseBody = await this.response.json();
  await context.dispose();
  
  console.log('\n📥 API RESPONSE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Status Code: ${this.response.status()}`);
  console.log(`Response Body:`);
  console.log(JSON.stringify(this.responseBody, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

/**
 * Then Steps - Response Validation
 */

Then('the response status code should be {int}', async function (statusCode: number) {
  console.log(`\n✓ Validating status code: Expected ${statusCode}, Got ${this.response.status()}`);
  expect(this.response.status()).toBe(statusCode);
});

Then('the response should contain {string} with value {int}', async function (key: string, value: number) {
  console.log(`\n✓ Validating field "${key}": Expected ${value}, Got ${this.responseBody[key]}`);
  expect(this.responseBody).toHaveProperty(key);
  expect(this.responseBody[key]).toBe(value);
});

Then('the response should contain {string} with value {string}', async function (key: string, value: string) {
  console.log(`\n✓ Validating field "${key}": Expected "${value}", Got "${this.responseBody[key]}"`);
  expect(this.responseBody).toHaveProperty(key);
  expect(this.responseBody[key]).toBe(value);
});

Then('the response should contain products array', async function () {
  console.log(`\n✓ Validating products array exists`);
  expect(this.responseBody).toHaveProperty('products');
  expect(Array.isArray(this.responseBody.products)).toBe(true);
  console.log(`  Products count: ${this.responseBody.products.length}`);
  expect(this.responseBody.products.length).toBeGreaterThan(0);
});

Then('each product should have {string}, {string}, {string}, {string}, and {string}', 
  async function (field1: string, field2: string, field3: string, field4: string, field5: string) {
    const products = this.responseBody.products;
    console.log(`\n✓ Validating product structure (${products.length} products)`);
    expect(products.length).toBeGreaterThan(0);
    
    products.forEach((product: any, index: number) => {
      expect(product).toHaveProperty(field1);
      expect(product).toHaveProperty(field2);
      expect(product).toHaveProperty(field3);
      expect(product).toHaveProperty(field4);
      expect(product).toHaveProperty(field5);
      if (index === 0) {
        console.log(`  First product example:`, JSON.stringify(product, null, 2));
      }
    });
  }
);

Then('search results should contain products matching {string}', async function (searchTerm: string) {
  const products = this.responseBody.products;
  console.log(`\n✓ Validating search results for "${searchTerm}"`);
  expect(products.length).toBeGreaterThan(0);
  
  const matchingProducts = products.filter((product: any) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(`  Matching products: ${matchingProducts.length}/${products.length}`);
  expect(matchingProducts.length).toBeGreaterThan(0);
});

Then('the response should contain brands array', async function () {
  console.log(`\n✓ Validating brands array exists`);
  expect(this.responseBody).toHaveProperty('brands');
  expect(Array.isArray(this.responseBody.brands)).toBe(true);
  console.log(`  Brands count: ${this.responseBody.brands.length}`);
  expect(this.responseBody.brands.length).toBeGreaterThan(0);
});

Then('each brand should have {string} and {string} fields', async function (field1: string, field2: string) {
  const brands = this.responseBody.brands;
  console.log(`\n✓ Validating brand structure (${brands.length} brands)`);
  expect(brands.length).toBeGreaterThan(0);
  
  brands.forEach((brand: any, index: number) => {
    expect(brand).toHaveProperty(field1);
    expect(brand).toHaveProperty(field2);
    if (index === 0) {
      console.log(`  First brand example:`, JSON.stringify(brand, null, 2));
    }
  });
});

Then('the response should contain user account details', async function () {
  console.log(`\n✓ Validating user account details exist`);
  expect(this.responseBody).toHaveProperty('user');
  expect(this.responseBody.user).toBeDefined();
  expect(this.responseBody.user).toHaveProperty('email');
  console.log(`  User details:`, JSON.stringify(this.responseBody.user, null, 2));
});
