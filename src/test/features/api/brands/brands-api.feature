@api @brands
Feature: Brands List API
  As a developer
  I want to test brands list APIs
  So that I can verify brand management functionality

  @smoke @positive
  Scenario: API 3 - Get All Brands List
    When I send GET request to "/api/brandsList"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain brands array
    And each brand should have "id" and "brand" fields

  @negative
  Scenario: API 4 - PUT To All Brands List (should not be supported)
    When I send PUT request to "/api/brandsList"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 405
    And the response should contain "message" with value "This request method is not supported."
