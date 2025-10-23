@api @products
Feature: Products List API
  As a developer
  I want to test products list APIs
  So that I can verify product listing functionality

  @smoke @positive
  Scenario: API 1 - Get All Products List
    When I send GET request to "/api/productsList"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain products array
    And each product should have "id", "name", "price", "brand", and "category"

  @negative
  Scenario: API 2 - POST To All Products List (should not be supported)
    When I send POST request to "/api/productsList"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 405
    And the response should contain "message" with value "This request method is not supported."

  @search @positive
  Scenario: API 5.1 - POST To Search Product with valid search term
    When I send POST request to "/api/searchProduct" with body:
      | search_product | Tshirt |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain products array
    And search results should contain products matching "Tshirt"

  @search @positive
  Scenario: API 5.2 - POST To Search Product with different search terms
    When I send POST request to "/api/searchProduct" with body:
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

  @search @negative
  Scenario: API 6.1 - POST To Search Product without search_product parameter
    When I send POST request to "/api/searchProduct" with empty body
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, search_product parameter is missing in POST request."

  @search @negative
  Scenario: API 6.2 - POST To Search Product with null search_product parameter
    When I send POST request to "/api/searchProduct" with body:
      | search_product |  |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
