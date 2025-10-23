@ui @products
Feature: Product Management
  As a user
  I want to browse and search products
  So that I can find items I want to purchase

  Background:
    Given I am on the home page

  @smoke @positive
  Scenario: View all products
    When I navigate to products page
    Then I should see all products list
    And products should be displayed with details

  @positive
  Scenario: View product details
    When I navigate to products page
    And I click on view product for first item
    Then I should see product detail page
    And I should see product name, category, price, availability, condition, and brand

  @search @positive
  Scenario: Search for a product
    When I navigate to products page
    And I search for "Blue Top"
    Then I should see "Searched Products" title
    And I should see products related to search

  @search @negative
  Scenario: Search for non-existent product
    When I navigate to products page
    And I search for "NonExistentProduct123"
    Then I should see "Searched Products" title
    And I should see no products in the results

  @regression @positive
  Scenario Outline: Search different product categories
    When I navigate to products page
    And I search for "<product_name>"
    Then I should see "Searched Products" title
    And search results should contain "<product_name>"

    Examples:
      | product_name |
      | Tshirt       |
      | Jeans        |
      | Dress        |
      | Top          |

  @positive
  Scenario: Add product to cart from products page
    When I navigate to products page
    And I add first product to cart
    And I click on continue shopping
    Then product should be added to cart successfully
