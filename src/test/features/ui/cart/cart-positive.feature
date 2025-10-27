@ui @cart @positive
Feature: Shopping Cart - Successful Operations
  As a customer
  I want to manage items in my shopping cart
  So that I can review and modify my purchases before checkout

  Background:
    Given the user is created
    And the user is on the home page

  @smoke
  Scenario: A customer adds a single product to the cart
    When the user adds a product to the shopping cart
    Then the product is in the shopping cart

  Scenario: Product details are displayed correctly in cart
    Given the user has added a product to the shopping cart
    Then the product details are displayed in the cart

  Scenario: Multiple products can be added to the cart
    When the user adds multiple products to the shopping cart
    Then all products are in the cart

  Scenario: Product details are accurate for multiple items
    Given the user has added multiple products to the shopping cart
    Then the product details for each item are displayed in the cart

  Scenario: Add product with specific quantity to cart
    When the user adds a product with quantity "4" to the cart
    Then the cart displays a quantity of "4" for that product

  Scenario: Remove a product from the cart
    Given the user has added a product to the shopping cart
    When the user removes that product from the cart
    Then the cart is empty

  Scenario: Proceed to checkout from the cart
    Given the user is logged in
    And the user has added a product to the shopping cart
    When the user proceeds to checkout
    Then the checkout page is displayed
