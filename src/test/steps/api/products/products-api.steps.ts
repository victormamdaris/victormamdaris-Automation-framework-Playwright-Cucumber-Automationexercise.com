import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { ApiClient } from '@core/api-client';
import { ProductsApiService } from '@services/api/products-api.service';

When('I send GET request to get all products', async function (this: CustomWorld) {
  const apiClient = new ApiClient();
  await apiClient.init();
  
  const productsService = new ProductsApiService(apiClient);
  const response = await productsService.getAllProductsList();
  
  this.testData.apiResponse = response;
  await apiClient.dispose();
});

When('I send POST request to search for {string}', async function (this: CustomWorld, searchTerm: string) {
  const apiClient = new ApiClient();
  await apiClient.init();
  
  const productsService = new ProductsApiService(apiClient);
  const response = await productsService.searchProduct(searchTerm);
  
  this.testData.apiResponse = response;
  this.testData.searchTerm = searchTerm;
  await apiClient.dispose();
});

When('I send GET request to get all brands', async function (this: CustomWorld) {
  const apiClient = new ApiClient();
  await apiClient.init();
  
  const productsService = new ProductsApiService(apiClient);
  const response = await productsService.getAllBrandsList();
  
  this.testData.apiResponse = response;
  await apiClient.dispose();
});

Then('the response should contain {string} array', async function (this: CustomWorld, arrayName: string) {
  const body = typeof this.testData.apiResponse.body === 'string' 
    ? JSON.parse(this.testData.apiResponse.body) 
    : this.testData.apiResponse.body;
  expect(body[arrayName]).toBeDefined();
  expect(Array.isArray(body[arrayName])).toBeTruthy();
});

Then('the products array should not be empty', async function (this: CustomWorld) {
  const body = typeof this.testData.apiResponse.body === 'string' 
    ? JSON.parse(this.testData.apiResponse.body) 
    : this.testData.apiResponse.body;
  expect(body.products).toBeDefined();
  expect(body.products.length).toBeGreaterThan(0);
});

Then('the brands array should not be empty', async function (this: CustomWorld) {
  expect(this.testData.apiResponse.body.brands).toBeDefined();
  expect(this.testData.apiResponse.body.brands.length).toBeGreaterThan(0);
});

Then('the {string} array should not be empty', async function (this: CustomWorld, arrayName: string) {
  expect(this.testData.apiResponse.body[arrayName].length).toBeGreaterThan(0);
});

Then('the response should contain empty {string} array', async function (this: CustomWorld, arrayName: string) {
  expect(this.testData.apiResponse.body[arrayName]).toBeDefined();
  expect(this.testData.apiResponse.body[arrayName].length).toBe(0);
});

Then('the products should match search criteria', async function (this: CustomWorld) {
  const products = this.testData.apiResponse.body.products;
  expect(products).toBeDefined();
  expect(products.length).toBeGreaterThan(0);
  
  // Verify at least one product matches search term
  const hasMatch = products.some((product: any) => 
    product.name.toLowerCase().includes(this.testData.searchTerm.toLowerCase())
  );
  expect(hasMatch).toBeTruthy();
});

Then('the products should contain {string} in results', async function (this: CustomWorld, searchTerm: string) {
  const products = this.testData.apiResponse.body.products;
  
  if (products && products.length > 0) {
    const hasMatch = products.some((product: any) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    expect(hasMatch).toBeTruthy();
  }
});

Then('each product should have required fields:', async function (this: CustomWorld, dataTable: any) {
  const products = this.testData.apiResponse.body.products;
  const requiredFields = dataTable.raw().flat();
  
  products.forEach((product: any) => {
    requiredFields.forEach((field: string) => {
      expect(product[field]).toBeDefined();
    });
  });
});
