import { Page } from '@playwright/test';
import { BasePage } from '@core/base-page';
import { CartPageLocators } from '../../../locators/ui/cart-page.locators';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isCartTableVisible(): Promise<boolean> {
    return await this.isVisible(CartPageLocators.CART_INFO_TABLE);
  }

  async getCartItemsCount(): Promise<number> {
    return await this.page.locator(CartPageLocators.CART_ITEMS).count();
  }

  async getProductName(index: number = 0): Promise<string> {
    console.log(`📦 [CartPage.getProductName] Looking for product name at index ${index}`);
    console.log(`📦 [CartPage.getProductName] Locator: ${CartPageLocators.PRODUCT_NAME}`);
    
    const products = this.page.locator(CartPageLocators.PRODUCT_NAME);
    const count = await products.count();
    console.log(`📦 [CartPage.getProductName] Found ${count} product name elements`);
    
    console.log(`📦 [CartPage.getProductName] Waiting for element at index ${index} to be visible...`);
    try {
      await products.nth(index).waitFor({ state: 'visible', timeout: 10000 });
      console.log(`📦 [CartPage.getProductName] Element is visible`);
    } catch (error) {
      console.error(`❌ [CartPage.getProductName] Element NOT visible after 10s:`, error);
      throw error;
    }
    
    const text = await products.nth(index).textContent() || '';
    console.log(`📦 [CartPage.getProductName] Product name text: "${text}"`);
    return text;
  }

  async getProductPrice(index: number = 0): Promise<string> {
    console.log(`💰 [CartPage.getProductPrice] Looking for product price at index ${index}`);
    console.log(`💰 [CartPage.getProductPrice] Locator: ${CartPageLocators.PRODUCT_PRICE}`);
    
    const prices = this.page.locator(CartPageLocators.PRODUCT_PRICE);
    const count = await prices.count();
    console.log(`💰 [CartPage.getProductPrice] Found ${count} product price elements`);
    
    console.log(`💰 [CartPage.getProductPrice] Waiting for element at index ${index} to be visible...`);
    try {
      await prices.nth(index).waitFor({ state: 'visible', timeout: 10000 });
      console.log(`💰 [CartPage.getProductPrice] Element is visible`);
    } catch (error) {
      console.error(`❌ [CartPage.getProductPrice] Element NOT visible after 10s:`, error);
      throw error;
    }
    
    const text = await prices.nth(index).textContent() || '';
    console.log(`💰 [CartPage.getProductPrice] Product price text: "${text}"`);
    return text;
  }

  async getProductQuantity(index: number = 0): Promise<string> {
    const quantities = this.page.locator(CartPageLocators.PRODUCT_QUANTITY);
    return await quantities.nth(index).textContent() || '';
  }

  async getProductTotal(index: number = 0): Promise<string> {
    const totals = this.page.locator(CartPageLocators.PRODUCT_TOTAL);
    return await totals.nth(index).textContent() || '';
  }

  async removeProduct(index: number = 0): Promise<void> {
    const deleteButtons = this.page.locator(CartPageLocators.DELETE_BUTTON);
    await deleteButtons.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(CartPageLocators.PROCEED_TO_CHECKOUT);
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.isVisible(CartPageLocators.EMPTY_CART_MESSAGE);
  }

  async calculateExpectedTotal(price: string, quantity: string): Promise<number> {
    const priceNum = parseFloat(price.replace(/[^\d.]/g, ''));
    const quantityNum = parseInt(quantity);
    return priceNum * quantityNum;
  }
}
