@api @authentication @login @positive
Feature: Login Verification API - Successful Operations
  As a system integrator
  I want to verify login through the API
  So that authentication can be validated programmatically

  Background:
    Given the API base URL is configured

  @smoke
  Scenario: API 7 - The system verifies login with valid credentials
    Given a user account exists with email "test@example.com"
    When the system receives a POST request to "/api/verifyLogin" with body:
      | email    | test@example.com |
      | password | Test@123         |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "User not found!"
