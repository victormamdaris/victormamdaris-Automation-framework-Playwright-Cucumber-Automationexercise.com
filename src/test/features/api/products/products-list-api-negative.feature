@api @products @negative @validation
Feature: Products List API - Business Validations
  As a system
  I want to validate products API requests
  So that invalid requests are properly rejected

  Background:
    Given the API base URL is configured

  Scenario: API 2 - Products list rejects unsupported POST method
    When the system receives a POST request to "/api/productsList" with empty body
    Then the response status code should be 200
    And the response should contain "responseCode" with value 405
    And the response should contain "message" with value "This request method is not supported."

  @search
  Scenario: API 6.1 - Product search fails without search_product parameter
    When the system receives a POST request to "/api/searchProduct" with empty body
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, search_product parameter is missing in POST request."

  @search
  Scenario: API 6.2 - Product search with null search_product parameter
    When the system receives a POST request to "/api/searchProduct" with body:
      | search_product |  |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
