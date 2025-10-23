export class ProductsPageLocators {
  // Products Page
  static readonly ALL_PRODUCTS_TITLE = 'text=All Products';
  static readonly PRODUCTS_LIST = '.features_items';
  static readonly PRODUCT_ITEM = '.single-products';
  static readonly PRODUCT_NAME = '.productinfo p';
  static readonly PRODUCT_PRICE = '.productinfo h2';
  static readonly VIEW_PRODUCT_BUTTON = 'a[href^="/product_details/"]';
  static readonly ADD_TO_CART_BUTTON = '.add-to-cart';

  // Search
  static readonly SEARCH_PRODUCT_INPUT = '#search_product';
  static readonly SEARCH_BUTTON = '#submit_search';
  static readonly SEARCHED_PRODUCTS_TITLE = 'text=Searched Products';

  // Product Details
  static readonly PRODUCT_DETAILS_NAME = '.product-information h2';
  static readonly PRODUCT_DETAILS_CATEGORY = '.product-information p:has-text("Category")';
  static readonly PRODUCT_DETAILS_PRICE = '.product-information span span';
  static readonly PRODUCT_DETAILS_AVAILABILITY = '.product-information p:has-text("Availability")';
  static readonly PRODUCT_DETAILS_CONDITION = '.product-information p:has-text("Condition")';
  static readonly PRODUCT_DETAILS_BRAND = '.product-information p:has-text("Brand")';
  static readonly QUANTITY_INPUT = '#quantity';
  static readonly ADD_TO_CART_DETAILS_BUTTON = 'button.cart';

  // Cart Modal
  static readonly CONTINUE_SHOPPING_BUTTON = 'button:has-text("Continue Shopping")';
  static readonly VIEW_CART_MODAL_BUTTON = 'a:has-text("View Cart")';

  // Categories
  static readonly CATEGORY_PANEL = '.left-sidebar .panel-group';
  static readonly CATEGORY_LINK = '.panel-heading a';
}
