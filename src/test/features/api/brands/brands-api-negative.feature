@api @brands @negative @validation
Feature: Brands List API - Business Validations
  As a system
  I want to validate brands API requests
  So that invalid requests are properly rejected

  Background:
    Given the API base URL is configured

  Scenario: API 4 - Brands list rejects unsupported PUT method
    When the system receives a PUT request to "/api/brandsList"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 405
    And the response should contain "message" with value "This request method is not supported."
