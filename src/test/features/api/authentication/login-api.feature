@api @authentication @login
Feature: Login Verification API
  As a developer
  I want to test login verification APIs
  So that I can verify authentication functionality

  @smoke @positive
  Scenario: API 7 - POST To Verify Login with valid details
    Given a user account exists with email "test@example.com"
    When I send POST request to "/api/verifyLogin" with body:
      | email    | test@example.com |
      | password | Test@123         |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "User not found!"

  @negative
  Scenario: API 8.1 - POST To Verify Login without email parameter
    When I send POST request to "/api/verifyLogin" with body:
      | password | Test@123 |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email or password parameter is missing in POST request."

  @negative
  Scenario: API 8.2 - POST To Verify Login without password parameter
    When I send POST request to "/api/verifyLogin" with body:
      | email | test@example.com |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email or password parameter is missing in POST request."

  @negative
  Scenario: API 9 - DELETE To Verify Login (should not be supported)
    When I send DELETE request to "/api/verifyLogin"
    Then the response status code should be 200
    And the response should contain "responseCode" with value 405
    And the response should contain "message" with value "This request method is not supported."

  @negative
  Scenario: API 10.1 - POST To Verify Login with invalid details
    When I send POST request to "/api/verifyLogin" with body:
      | email    | invalid@example.com |
      | password | WrongPassword123    |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "User not found!"

  @negative
  Scenario: API 10.2 - POST To Verify Login with invalid email format
    When I send POST request to "/api/verifyLogin" with body:
      | email    | notanemail |
      | password | Test@123   |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "User not found!"

  @negative
  Scenario: API 10.3 - POST To Verify Login with empty credentials
    When I send POST request to "/api/verifyLogin" with body:
      | email    |  |
      | password |  |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
