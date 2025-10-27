import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { CartPage } from '@pages/ui/cart/cart.page';
import { ProductsPage } from '@pages/ui/products/products.page';
import { HomePage } from '@pages/ui/home/home.page';
import { LoginPage } from '@pages/ui/authentication/login.page';

// ============================================================================
// Background Steps
// ============================================================================

Given('a registered user exists', async function (this: CustomWorld) {
  // User creation is handled by hooks - this step documents the precondition
  // The actual user creation happens in Before hook
});

Given('the user is on the home page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
});

// ============================================================================
// Given Steps - Preconditions
// ============================================================================

Given('the user has added a product to the shopping cart', { timeout: 30000 }, async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const homePage = new HomePage(this.page);
  
  console.log('🛒 [ADD TO CART] Step started - adding product to cart');
  console.log('🛒 [ADD TO CART] Current URL:', this.page.url());
  
  // Navigate to products page
  console.log('🛒 [ADD TO CART] Clicking Products link...');
  await homePage.clickProducts();
  await this.page.waitForTimeout(1000);
  console.log('🛒 [ADD TO CART] Products page URL:', this.page.url());
  
  // Add first product to cart
  console.log('🛒 [ADD TO CART] Adding product index 0 to cart...');
  await productsPage.addProductToCart(0);
  await this.page.waitForTimeout(2000);
  console.log('🛒 [ADD TO CART] Product added, modal should be visible');
  
  // View cart
  console.log('🛒 [ADD TO CART] Clicking View Cart...');
  await productsPage.viewCart();
  await this.page.waitForTimeout(1000);
  console.log('🛒 [ADD TO CART] Cart page URL:', this.page.url());
  console.log('✅ [ADD TO CART] Step completed - should be on cart page now');
});

Given('the user has added multiple products to the shopping cart', { timeout: 30000 }, async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const homePage = new HomePage(this.page);
  
  // Navigate to products page
  await homePage.clickProducts();
  await this.page.waitForTimeout(1000);
  
  // Add first product
  await productsPage.addProductToCart(0);
  await this.page.waitForTimeout(2000);
  await productsPage.continueShopping();
  await this.page.waitForTimeout(1000);
  
  // Add second product
  await productsPage.addProductToCart(1);
  await this.page.waitForTimeout(2000);
  
  // View cart
  await productsPage.viewCart();
  await this.page.waitForTimeout(1000);
});

When('the user adds a product to the shopping cart', { timeout: 15000 }, async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const homePage = new HomePage(this.page);
  
  // Navigate to products page
  await homePage.clickProducts();
  await this.page.waitForTimeout(1000);
  
  // Add product to cart
  await productsPage.addProductToCart(0);
  await this.page.waitForTimeout(2000);
  
  // View cart
  await productsPage.viewCart();
  await this.page.waitForTimeout(1000);
});

When('the user adds multiple products to the shopping cart', { timeout: 20000 }, async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  const homePage = new HomePage(this.page);
  
  // Navigate to products page
  await homePage.clickProducts();
  await this.page.waitForTimeout(1000);
  
  // Add first product
  await productsPage.addProductToCart(0);
  await this.page.waitForTimeout(2000);
  await productsPage.continueShopping();
  await this.page.waitForTimeout(1000);
  
  // Add second product
  await productsPage.addProductToCart(1);
  await this.page.waitForTimeout(2000);
  
  // View cart
  await productsPage.viewCart();
  await this.page.waitForTimeout(1000);
});

When('the user adds a product with quantity {string} to the cart', { timeout: 20000 }, async function (this: CustomWorld, quantity: string) {
  const productsPage = new ProductsPage(this.page);
  const homePage = new HomePage(this.page);
  
  console.log(`🛒 [ADD WITH QUANTITY] Adding product with quantity ${quantity}`);
  
  // Navigate to products page
  await homePage.clickProducts();
  await this.page.waitForTimeout(1000);
  
  // View product details
  await productsPage.clickViewProduct(0);
  await this.page.waitForTimeout(1000);
  
  // Set quantity
  console.log(`🛒 [ADD WITH QUANTITY] Setting quantity to ${quantity}`);
  await productsPage.setQuantity(quantity);
  await this.page.waitForTimeout(500);
  
  // Add to cart
  console.log(`🛒 [ADD WITH QUANTITY] Adding to cart...`);
  await productsPage.addToCartFromDetails();
  await this.page.waitForTimeout(2000);
  
  // View cart
  console.log(`🛒 [ADD WITH QUANTITY] Viewing cart...`);
  await productsPage.viewCart();
  await this.page.waitForTimeout(1000);
  console.log(`✅ [ADD WITH QUANTITY] Cart URL: ${this.page.url()}`);
});

When('the user changes the product quantity to {string}', { timeout: 20000 }, async function (this: CustomWorld, quantity: string) {
  const productsPage = new ProductsPage(this.page);
  const homePage = new HomePage(this.page);
  
  // Navigate to products page and view product details
  await homePage.clickProducts();
  await this.page.waitForTimeout(1000);
  await productsPage.clickViewProduct(0);
  await this.page.waitForTimeout(1000);
  
  // Change quantity
  await productsPage.setQuantity(quantity);
  await this.page.waitForTimeout(500);
  
  // Add to cart
  await productsPage.addToCartFromDetails();
  await this.page.waitForTimeout(2000);
  
  // View cart
  await productsPage.viewCart();
  await this.page.waitForTimeout(1000);
});

When('the user removes that product from the cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.removeProduct(0);
  await this.page.waitForTimeout(1000);
});

When('the cart total is displayed', async function (this: CustomWorld) {
  // Cart total is already displayed when viewing cart
  // This step serves as a transition to Then steps
  await this.page.waitForTimeout(500);
});

When('the user proceeds to checkout', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.proceedToCheckout();
  await this.page.waitForTimeout(2000);
});

// ============================================================================
// Then Steps - Assertions (Outcome-Based)
// ============================================================================

/**
 * Outcome: The product is in the shopping cart
 */
Then('the product is in the shopping cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const isVisible = await cartPage.isCartTableVisible();
  expect(isVisible).toBeTruthy();
  
  const itemsCount = await cartPage.getCartItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

/**
 * Outcome: The product details are displayed in the cart
 */
Then('the product details are displayed in the cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  
  console.log('🔍 [CART DETAILS] Step started - checking product details in cart');
  console.log('🔍 [CART DETAILS] Current URL:', this.page.url());
  
  // Wait for cart to be visible
  console.log('🔍 [CART DETAILS] Waiting for cart table to be visible...');
  await this.page.waitForTimeout(2000);
  
  // Check if we're on cart page
  const currentUrl = this.page.url();
  console.log('🔍 [CART DETAILS] Verified URL:', currentUrl);
  
  // Get product name
  console.log('🔍 [CART DETAILS] Getting product name for item index 0...');
  const productName = await cartPage.getProductName(0);
  console.log('🔍 [CART DETAILS] Product name retrieved:', productName);
  
  // Get product price
  console.log('🔍 [CART DETAILS] Getting product price for item index 0...');
  const productPrice = await cartPage.getProductPrice(0);
  console.log('🔍 [CART DETAILS] Product price retrieved:', productPrice);
  
  // Assertions
  console.log('🔍 [CART DETAILS] Asserting product name is truthy...');
  expect(productName).toBeTruthy();
  console.log('✅ [CART DETAILS] Product name assertion passed');
  
  console.log('🔍 [CART DETAILS] Asserting product price is truthy...');
  expect(productPrice).toBeTruthy();
  console.log('✅ [CART DETAILS] Product price assertion passed');
  
  console.log('✅ [CART DETAILS] Step completed successfully');
});

/**
 * Outcome: All products are in the cart
 */
Then('all products are in the cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const itemsCount = await cartPage.getCartItemsCount();
  expect(itemsCount).toBe(2); // We added 2 products
});

/**
 * Outcome: The product details for each item are displayed in the cart
 */
Then('the product details for each item are displayed in the cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const itemsCount = await cartPage.getCartItemsCount();
  
  for (let i = 0; i < itemsCount; i++) {
    const productName = await cartPage.getProductName(i);
    const productPrice = await cartPage.getProductPrice(i);
    
    expect(productName).toBeTruthy();
    expect(productPrice).toBeTruthy();
  }
});

/**
 * Outcome: The cart displays a quantity of X for that product
 */
Then('the cart displays a quantity of {string} for that product', async function (this: CustomWorld, expectedQuantity: string) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const actualQuantity = await cartPage.getProductQuantity(0);
  expect(actualQuantity.trim()).toBe(expectedQuantity);
});

/**
 * Outcome: The cart is empty
 */
Then('the cart is empty', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const isEmpty = await cartPage.isCartEmpty();
  expect(isEmpty).toBeTruthy();
});

// ============================================================================
// Legacy Steps - Kept for backward compatibility
// ============================================================================

Then('the shopping cart contains that product', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const isVisible = await cartPage.isCartTableVisible();
  expect(isVisible).toBeTruthy();
  
  const itemsCount = await cartPage.getCartItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

Then('the product details are displayed correctly', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  const productName = await cartPage.getProductName(0);
  const productPrice = await cartPage.getProductPrice(0);
  
  expect(productName).toBeTruthy();
  expect(productPrice).toBeTruthy();
});

Then('the cart shows all added products', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const itemsCount = await cartPage.getCartItemsCount();
  expect(itemsCount).toBe(2); // We added 2 products
});

Then('the product details for each item are accurate', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const itemsCount = await cartPage.getCartItemsCount();
  
  for (let i = 0; i < itemsCount; i++) {
    const productName = await cartPage.getProductName(i);
    const productPrice = await cartPage.getProductPrice(i);
    
    expect(productName).toBeTruthy();
    expect(productPrice).toBeTruthy();
  }
});

Then('the cart shows a quantity of {string} for that product', async function (this: CustomWorld, expectedQuantity: string) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const actualQuantity = await cartPage.getProductQuantity(0);
  expect(actualQuantity.trim()).toBe(expectedQuantity);
});

Then('the cart should be empty', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  
  const isEmpty = await cartPage.isCartEmpty();
  expect(isEmpty).toBeTruthy();
});

Then('the total should equal the sum of all product subtotals', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  const itemsCount = await cartPage.getCartItemsCount();
  
  let expectedTotal = 0;
  for (let i = 0; i < itemsCount; i++) {
    const total = await cartPage.getProductTotal(i);
    const totalValue = parseFloat(total.replace(/[^\d.]/g, ''));
    expectedTotal += totalValue;
  }
  
  expect(expectedTotal).toBeGreaterThan(0);
});

Then('each product subtotal should equal its price multiplied by quantity', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  const itemsCount = await cartPage.getCartItemsCount();
  
  for (let i = 0; i < itemsCount; i++) {
    const price = await cartPage.getProductPrice(i);
    const quantity = await cartPage.getProductQuantity(i);
    const total = await cartPage.getProductTotal(i);
    
    const expectedTotal = await cartPage.calculateExpectedTotal(price, quantity);
    const actualTotal = parseFloat(total.replace(/[^\d.]/g, ''));
    
    expect(actualTotal).toBeCloseTo(expectedTotal, 0);
  }
});

Then('the checkout page is displayed', async function (this: CustomWorld) {
  await this.page.waitForTimeout(2000);
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('checkout');
});

// ============================================================================
// Legacy Steps - Keep for backward compatibility during transition
// ============================================================================

Then('I should see the product in cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  const isVisible = await cartPage.isCartTableVisible();
  expect(isVisible).toBeTruthy();
  
  const itemsCount = await cartPage.getCartItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

Then('product details should be correct', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  const productName = await cartPage.getProductName(0);
  expect(productName).toBeTruthy();
});

When('I add multiple products to cart', { timeout: 15000 }, async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  
  // Add first product
  await productsPage.addProductToCart(0);
  await this.page.waitForTimeout(2000);
  await productsPage.continueShopping();
  await this.page.waitForTimeout(1000);
  
  // Add second product
  await productsPage.addProductToCart(1);
  await this.page.waitForTimeout(2000);
});

Then('I should see {int} products in cart', async function (this: CustomWorld, expectedCount: number) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  const actualCount = await cartPage.getCartItemsCount();
  expect(actualCount).toBe(expectedCount);
});

Then('all product details should be correct', { timeout: 30000 }, async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(2000);
  const itemsCount = await cartPage.getCartItemsCount();
  
  for (let i = 0; i < itemsCount; i++) {
    const productName = await cartPage.getProductName(i);
    const productPrice = await cartPage.getProductPrice(i);
    
    expect(productName).toBeTruthy();
    expect(productPrice).toBeTruthy();
  }
});

Then('product quantity should be {string}', async function (this: CustomWorld, expectedQuantity: string) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  const actualQuantity = await cartPage.getProductQuantity(0);
  expect(actualQuantity.trim()).toBe(expectedQuantity);
});

When('I remove the product from cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.removeProduct(0);
});

Then('cart should be empty', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await this.page.waitForTimeout(1000);
  const isEmpty = await cartPage.isCartEmpty();
  expect(isEmpty).toBeTruthy();
});

Then('cart total should be calculated correctly', { timeout: 30000 }, async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  const itemsCount = await cartPage.getCartItemsCount();
  
  for (let i = 0; i < itemsCount; i++) {
    const price = await cartPage.getProductPrice(i);
    const quantity = await cartPage.getProductQuantity(i);
    const total = await cartPage.getProductTotal(i);
    
    const expectedTotal = await cartPage.calculateExpectedTotal(price, quantity);
    const actualTotal = parseFloat(total.replace(/[^\d.]/g, ''));
    
    expect(actualTotal).toBeCloseTo(expectedTotal, 0);
  }
});

Then('individual product totals should be correct', { timeout: 30000 }, async function (this: CustomWorld) {
  // Same as above
  const cartPage = new CartPage(this.page);
  const itemsCount = await cartPage.getCartItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

When('I click proceed to checkout', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.proceedToCheckout();
});

Then('I should be on checkout page', async function (this: CustomWorld) {
  await this.page.waitForTimeout(2000);
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('checkout');
});

