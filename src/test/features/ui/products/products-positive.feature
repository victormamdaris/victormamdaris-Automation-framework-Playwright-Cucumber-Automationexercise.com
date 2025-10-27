@ui @products @positive
Feature: Product Browsing and Search - Successful Operations
  As a customer
  I want to browse and search for products
  So that I can find items I want to purchase

  Background:
    Given the user is on the products page

  @smoke
  Scenario: Customer views all available products
    Then all products are displayed

  Scenario: Each product shows required information
    Then each product displays name, price, and image

  Scenario: Customer views product detail page
    When the user requests product details
    Then the product detail page is displayed

  Scenario: Product detail page shows complete information
    When the user requests product details
    Then the product detail page displays name, category, price, availability, condition, and brand

  @search
  Scenario: Customer searches for a specific product
    When the user searches for "Blue Top"
    Then search results are displayed

  @search
  Scenario: Search results contain matching products
    When the user searches for "Blue Top"
    Then the search results contain products matching "Blue Top"

  @regression
  Scenario Outline: Customer searches different product categories
    When the user searches for "<product_name>"
    Then search results are displayed
    And the results contain products matching "<product_name>"

    Examples:
      | product_name |
      | Tshirt       |
      | Jeans        |
      | Dress        |
      | Top          |

  Scenario: Customer adds a product to cart from products listing
    When the user adds a product to their cart
    Then the product is successfully added to the cart
