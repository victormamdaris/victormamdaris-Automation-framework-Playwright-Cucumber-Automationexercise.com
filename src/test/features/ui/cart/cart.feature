@ui @cart
Feature: Shopping Cart
  As a user
  I want to manage my shopping cart
  So that I can review and modify my selected items

  @smoke @positive
  Scenario: Add single product to cart
    Given the user is created
    And I am on the home page
    When I navigate to products page
    And I add first product to cart
    And I click on view cart
    Then I should see the product in cart
    And product details should be correct

  @positive
  Scenario: Add multiple products to cart
    Given the user is created
    And I am on the home page
    When I navigate to products page
    And I add first product to cart
    And I click on continue shopping
    And I add second product to cart
    And I click on view cart
    Then I should see 2 products in cart
    And all product details should be correct

  @positive
  Scenario: Verify product quantity in cart
    Given the user is created
    And I am on the home page
    When I navigate to products page
    And I click on view product for first item
    And I change quantity to "4"
    And I click add to cart
    And I click on view cart
    Then product quantity should be "4"

  @positive
  Scenario: Remove product from cart
    Given the user is created
    And I am on the home page
    When I navigate to products page
    And I add first product to cart
    And I click on view cart
    Then I should see the product in cart
    When I remove the product from cart
    Then cart should be empty

  @regression
  Scenario: Verify cart total calculation
    Given the user is created
    And I am on the home page
    When I navigate to products page
    And I add multiple products to cart
    And I click on view cart
    Then cart total should be calculated correctly
    And individual product totals should be correct

  @positive
  Scenario: Proceed to checkout from cart
    Given the user is created
    And I am on the home page
    When I navigate to login page
    And the user is logged in
    And I navigate to products page
    And I add first product to cart
    And I click on view cart
    And I click proceed to checkout
    Then I should be on checkout page
