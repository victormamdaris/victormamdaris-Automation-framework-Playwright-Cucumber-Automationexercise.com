@ui @cart @validation @regression @negative
Feature: Shopping Cart - Business Validations
  As a system
  I want to validate cart calculations and business rules
  So that pricing accuracy is maintained

  Scenario: Calculate the cart total
    Given the user is created
    And the user is on the home page
    And the user has added multiple products to the shopping cart
    When the cart total is displayed
    Then the total should equal the sum of all product subtotals
    And each product subtotal should equal its price multiplied by quantity
