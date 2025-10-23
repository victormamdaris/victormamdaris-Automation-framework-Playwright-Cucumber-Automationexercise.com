export class HomePageLocators {
  // Navigation
  static readonly HOME_LINK = 'a[href="/"]';
  static readonly PRODUCTS_LINK = 'a[href="/products"]';
  static readonly CART_LINK = 'a[href="/view_cart"]';
  static readonly SIGNUP_LOGIN_LINK = 'a[href="/login"]';
  static readonly LOGOUT_LINK = 'a[href="/logout"]';
  static readonly DELETE_ACCOUNT_LINK = 'a[href="/delete_account"]';
  static readonly CONTACT_US_LINK = 'a[href="/contact_us"]';
  static readonly TEST_CASES_LINK = 'a[href="/test_cases"]';

  // Header
  static readonly LOGO = '.logo';
  static readonly LOGGED_IN_USER = 'li:has-text("Logged in as") a';

  // Carousel
  static readonly CAROUSEL = '#slider-carousel';
  static readonly CAROUSEL_INDICATORS = '.carousel-indicators li';

  // Features
  static readonly FEATURES_ITEMS = '.features_items';
  static readonly CATEGORY_PRODUCTS = '.category-products';

  // Footer
  static readonly FOOTER = '#footer';
  static readonly SUBSCRIPTION_EMAIL = '#susbscribe_email';
  static readonly SUBSCRIPTION_BUTTON = '#subscribe';
  static readonly SUCCESS_SUBSCRIBE_MESSAGE = '.alert-success';
}
