@api @products @positive
Feature: Products List API - Successful Operations
  As a system integrator
  I want to retrieve product information through the API
  So that product listings can be accessed programmatically

  Background:
    Given the API base URL is configured

  @smoke
  Scenario: API 1 - The system retrieves all products
    When the system receives a GET request to "/api/productsList"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain products array
    And each product should have "id", "name", "price", "brand", and "category"

  @search
  Scenario: API 5.1 - The system searches products with valid search term
    When the system receives a POST request to "/api/searchProduct" with body:
      | search_product | Tshirt |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain products array
    And search results should contain products matching "Tshirt"

  @search
  Scenario: API 5.2 - The system searches products with different search terms
    When the system receives a POST request to "/api/searchProduct" with body:
      | search_product | <search_term> |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain products array

    Examples:
      | search_term |
      | Top         |
      | Jeans       |
      | Dress       |
      | Shirt       |
