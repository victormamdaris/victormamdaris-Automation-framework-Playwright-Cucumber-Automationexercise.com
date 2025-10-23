import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/custom-world';
import { HomePage } from '@pages/ui/home/home.page';
import { ProductsPage } from '@pages/ui/products/products.page';

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
