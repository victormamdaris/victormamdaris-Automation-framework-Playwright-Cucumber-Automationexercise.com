export const CartPageLocators = {
  // Cart table
  CART_TABLE: '#cart_info',
  CART_INFO_TABLE: '#cart_info_table',
  
  // Cart items - try multiple possible selectors
  CART_ITEMS: 'tbody tr',
  CART_PRODUCT: '#product-',
  
  // Product details in cart (selectors that match all items, use .nth(index) to select specific)
  PRODUCT_IMAGE: '.cart_product img, td.cart_product img',
  PRODUCT_NAME: '.cart_description h4 a, td.cart_description h4 a, td h4 a',
  PRODUCT_PRICE: '.cart_price p, td.cart_price p, td.cart_price',
  PRODUCT_QUANTITY: '.cart_quantity button, td.cart_quantity button, .disabled',
  PRODUCT_TOTAL: '.cart_total p, td.cart_total p, .cart_total_price',
  
  // Cart actions
  DELETE_BUTTON: '.cart_delete a, .cart_quantity_delete a',
  
  // Cart summary
  CART_TOTAL_AMOUNT: '.cart_total_price',
  
  // Checkout
  PROCEED_TO_CHECKOUT: '.check_out, a.check_out',
  
  // Empty cart message
  EMPTY_CART_MESSAGE: 'text=Cart is empty',
  EMPTY_CART_PARAGRAPH: 'p.text-center',
  
  // Subscription
  SUBSCRIPTION_INPUT: '#susbscribe_email',
  SUBSCRIBE_BUTTON: '#subscribe',
  SUBSCRIPTION_SUCCESS_ALERT: '.alert-success'
};
