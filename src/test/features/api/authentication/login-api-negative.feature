@api @authentication @login @negative @validation
Feature: Login Verification API - Business Validations
  As a system
  I want to validate login API requests
  So that invalid requests are properly rejected

  Background:
    Given the API base URL is configured

  Scenario: API 8.1 - Login verification fails when email parameter is missing
    When the system receives a POST request to "/api/verifyLogin" with body:
      | password | Test@123 |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email or password parameter is missing in POST request."

  Scenario: API 8.2 - Login verification fails when password parameter is missing
    When the system receives a POST request to "/api/verifyLogin" with body:
      | email | test@example.com |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email or password parameter is missing in POST request."

  Scenario: API 9 - Login verification rejects unsupported DELETE method
    When the system receives a DELETE request to "/api/verifyLogin"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 405
    And the response should contain "message" with value "This request method is not supported."

  Scenario: API 10.1 - Login verification fails with invalid credentials
    When the system receives a POST request to "/api/verifyLogin" with body:
      | email    | invalid@example.com |
      | password | WrongPassword123    |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "User not found!"

  Scenario: API 10.2 - Login verification fails with invalid email format
    When the system receives a POST request to "/api/verifyLogin" with body:
      | email    | notanemail |
      | password | Test@123   |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "User not found!"

  Scenario: API 10.3 - Login verification fails with empty credentials
    When the system receives a POST request to "/api/verifyLogin" with body:
      | email    |  |
      | password |  |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
