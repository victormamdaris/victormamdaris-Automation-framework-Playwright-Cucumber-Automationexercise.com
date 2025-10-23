import { Page } from '@playwright/test';
import { BasePage } from '@core/base-page';
import { ProductsPageLocators } from '@locators/ui/products-page.locators';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyProductsPageLoaded(): Promise<boolean> {
    return await this.isVisible(ProductsPageLocators.ALL_PRODUCTS_TITLE);
  }

  async searchProduct(productName: string): Promise<void> {
    await this.fill(ProductsPageLocators.SEARCH_PRODUCT_INPUT, productName);
    await this.click(ProductsPageLocators.SEARCH_BUTTON);
  }

  async isSearchedProductsTitleVisible(): Promise<boolean> {
    return await this.isVisible(ProductsPageLocators.SEARCHED_PRODUCTS_TITLE);
  }

  async getProductsCount(): Promise<number> {
    const products = await this.page.locator(ProductsPageLocators.PRODUCT_ITEM).count();
    return products;
  }

  async clickViewProduct(index: number = 0): Promise<void> {
    const viewButtons = this.page.locator(ProductsPageLocators.VIEW_PRODUCT_BUTTON);
    await viewButtons.nth(index).click();
  }

  async addProductToCart(index: number = 0): Promise<void> {
    const products = this.page.locator(ProductsPageLocators.PRODUCT_ITEM);
    await products.nth(index).hover();
    const addToCartBtn = products.nth(index).locator(ProductsPageLocators.ADD_TO_CART_BUTTON).first();
    await addToCartBtn.click();
  }

  async continueShopping(): Promise<void> {
    await this.click(ProductsPageLocators.CONTINUE_SHOPPING_BUTTON);
  }

  async viewCart(): Promise<void> {
    await this.click(ProductsPageLocators.VIEW_CART_MODAL_BUTTON);
  }

  async getProductName(index: number = 0): Promise<string> {
    const productNames = this.page.locator(ProductsPageLocators.PRODUCT_NAME);
    return await productNames.nth(index).textContent() || '';
  }

  async getProductPrice(index: number = 0): Promise<string> {
    const productPrices = this.page.locator(ProductsPageLocators.PRODUCT_PRICE);
    return await productPrices.nth(index).textContent() || '';
  }

  async getProductDetailsName(): Promise<string> {
    return await this.getText(ProductsPageLocators.PRODUCT_DETAILS_NAME);
  }

  async getProductDetailsPrice(): Promise<string> {
    return await this.getText(ProductsPageLocators.PRODUCT_DETAILS_PRICE);
  }

  async setQuantity(quantity: string): Promise<void> {
    await this.fill(ProductsPageLocators.QUANTITY_INPUT, '');
    await this.fill(ProductsPageLocators.QUANTITY_INPUT, quantity);
  }

  async addToCartFromDetails(): Promise<void> {
    await this.click(ProductsPageLocators.ADD_TO_CART_DETAILS_BUTTON);
  }
}
