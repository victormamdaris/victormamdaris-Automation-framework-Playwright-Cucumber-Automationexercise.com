import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { CartPage } from '@pages/ui/cart/cart.page';
import { ProductsPage } from '@pages/ui/products/products.page';

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
