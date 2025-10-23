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
    const products = this.page.locator(CartPageLocators.PRODUCT_NAME);
    await products.nth(index).waitFor({ state: 'visible', timeout: 10000 });
    return await products.nth(index).textContent() || '';
  }

  async getProductPrice(index: number = 0): Promise<string> {
    const prices = this.page.locator(CartPageLocators.PRODUCT_PRICE);
    await prices.nth(index).waitFor({ state: 'visible', timeout: 10000 });
    return await prices.nth(index).textContent() || '';
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
