@api @brands @positive
Feature: Brands List API - Successful Operations
  As a system integrator
  I want to retrieve brand information through the API
  So that brand listings can be accessed programmatically

  Background:
    Given the API base URL is configured

  @smoke
  Scenario: API 3 - The system retrieves all brands
    When the system receives a GET request to "/api/brandsList"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain brands array
    And each brand should have "id" and "brand" fields
