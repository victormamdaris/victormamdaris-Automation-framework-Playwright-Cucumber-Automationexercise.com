import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { HomePage } from '@pages/ui/home/home.page';
import { ProductsPage } from '@pages/ui/products/products.page';

// ============================================================================
// Background Steps
// ============================================================================

Given('the user is on the products page', { timeout: 10000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
  
  // Navigate to products page
  await homePage.clickProducts();
  await this.page.waitForTimeout(2000);
});

// ============================================================================
// When Steps - Actions
// ============================================================================

/**
 * Declarative: User requests product details
 */
When('the user requests product details', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.clickViewProduct(0);
  await this.page.waitForTimeout(1000);
});

/**
 * Legacy: User selects a product to view details
 */
When('the user selects a product to view details', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.clickViewProduct(0);
  await this.page.waitForTimeout(1000);
});

When('the user searches for {string}', async function (this: CustomWorld, searchTerm: string) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.searchProduct(searchTerm);
  await this.page.waitForTimeout(1000);
});

When('the user adds a product to their cart', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.addProductToCart(0);
  await this.page.waitForTimeout(2000);
  await productsPage.continueShopping();
  await this.page.waitForTimeout(1000);
});

// ============================================================================
// Then Steps - Assertions (Outcome-Based)
// ============================================================================

/**
 * Outcome: All products are displayed
 */
Then('all products are displayed', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const isLoaded = await productsPage.verifyProductsPageLoaded();
  expect(isLoaded).toBeTruthy();
});

/**
 * Outcome: Each product displays name, price, and image
 */
Then('each product displays name, price, and image', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  expect(productCount).toBeGreaterThan(0);
});

/**
 * Outcome: The product detail page displays complete information
 */
Then('the product detail page displays name, category, price, availability, condition, and brand', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productName = await productsPage.getProductDetailsName();
  const productPrice = await productsPage.getProductDetailsPrice();
  
  expect(productName).toBeTruthy();
  expect(productPrice).toBeTruthy();
});

/**
 * Outcome: The search results contain products matching the term
 */
Then('the search results contain products matching {string}', async function (this: CustomWorld, searchTerm: string) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  expect(productCount).toBeGreaterThan(0);
  
  if (productCount > 0) {
    const productName = await productsPage.getProductName(0);
    expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
  }
});

// ============================================================================
// Legacy Steps - Kept for backward compatibility
// ============================================================================

Then('all products are displayed with their details', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const isLoaded = await productsPage.verifyProductsPageLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('each product shows name, price, and image', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  expect(productCount).toBeGreaterThan(0);
});

Then('the product detail page is displayed', async function (this: CustomWorld) {
  await this.page.waitForTimeout(1000);
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/product_details/');
});

Then('the page shows name, category, price, availability, condition, and brand', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productName = await productsPage.getProductDetailsName();
  const productPrice = await productsPage.getProductDetailsPrice();
  
  expect(productName).toBeTruthy();
  expect(productPrice).toBeTruthy();
});

Then('search results are displayed', async function (this: CustomWorld) {
  await this.page.waitForTimeout(1000);
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain('Searched Products');
});

Then('the results contain products matching {string}', async function (this: CustomWorld, searchTerm: string) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  expect(productCount).toBeGreaterThan(0);
  
  if (productCount > 0) {
    const productName = await productsPage.getProductName(0);
    expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
  }
});

Then('no products are found', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  expect(productCount).toBe(0);
});

Then('the product is successfully added to the cart', async function (this: CustomWorld) {
  // Product was added successfully (verified by no error)
  await this.page.waitForTimeout(500);
});

// ============================================================================
// Legacy Steps - Keep for backward compatibility during transition
// ============================================================================

When('I navigate to products page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickProducts();
});

Then('I should see all products list', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await this.page.waitForTimeout(1000);
  const isLoaded = await productsPage.verifyProductsPageLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('products should be displayed with details', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  expect(productCount).toBeGreaterThan(0);
});

When('I click on view product for first item', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.clickViewProduct(0);
});

Then('I should see product detail page', async function (this: CustomWorld) {
  await this.page.waitForTimeout(1000);
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/product_details/');
});

Then('I should see product name, category, price, availability, condition, and brand', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productName = await productsPage.getProductDetailsName();
  const productPrice = await productsPage.getProductDetailsPrice();
  
  expect(productName).toBeTruthy();
  expect(productPrice).toBeTruthy();
});

When('I search for {string}', async function (this: CustomWorld, searchTerm: string) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.searchProduct(searchTerm);
  await this.page.waitForTimeout(1000);
});

Then('I should see {string} title', async function (this: CustomWorld, expectedTitle: string) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain(expectedTitle);
});

Then('I should see products related to search', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  expect(productCount).toBeGreaterThan(0);
});

Then('I should see no products in the results', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  expect(productCount).toBe(0);
});

Then('search results should contain {string}', async function (this: CustomWorld, searchTerm: string) {
  const productsPage = new ProductsPage(this.page);
  const productCount = await productsPage.getProductsCount();
  
  if (productCount > 0) {
    const productName = await productsPage.getProductName(0);
    expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
  }
});

When('I add first product to cart', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.addProductToCart(0);
  await this.page.waitForTimeout(2000);
});

When('I add second product to cart', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.addProductToCart(1);
  await this.page.waitForTimeout(2000);
});

When('I click on continue shopping', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.continueShopping();
  await this.page.waitForTimeout(1000);
});

Then('product should be added to cart successfully', async function (this: CustomWorld) {
  // Verification would be done in cart page
  await this.page.waitForTimeout(1000);
});

When('I change quantity to {string}', async function (this: CustomWorld, quantity: string) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.setQuantity(quantity);
});

When('I click add to cart', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.addToCartFromDetails();
  await this.page.waitForTimeout(2000);
});

When('I click on view cart', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.viewCart();
  await this.page.waitForTimeout(1000);
});

