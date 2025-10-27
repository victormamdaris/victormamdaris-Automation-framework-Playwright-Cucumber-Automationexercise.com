@api @user @registration @negative @validation
Feature: User Account Management API - Business Validations
  As a system
  I want to validate user account API requests
  So that invalid requests are properly rejected

  Background:
    Given the API base URL is configured

  Scenario: API 11.3 - Account creation fails with existing email
    Given a user account exists with email "existing@example.com"
    When the system receives a POST request to "/api/createAccount" with form data:
      | name     | Another User         |
      | email    | existing@example.com |
      | password | Test@123             |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, firstname parameter is missing in POST request."

  Scenario: API 11.4 - Account creation fails without email parameter
    When the system receives a POST request to "/api/createAccount" with form data:
      | name     | No Email User |
      | password | Test@123      |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email parameter is missing in POST request."

  Scenario: API 11.5 - Account creation fails without password parameter
    When the system receives a POST request to "/api/createAccount" with form data:
      | name  | No Password User     |
      | email | nopass@example.com   |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, password parameter is missing in POST request."

  Scenario: API 12.2 - Account deletion fails without email parameter
    When the system receives a DELETE request to "/api/deleteAccount" with body:
      | password | Delete@123 |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email parameter is missing in DELETE request."

  Scenario: API 12.3 - Account deletion fails with non-existing email
    When the system receives a DELETE request to "/api/deleteAccount" with body:
      | email    | nonexisting@example.com |
      | password | Delete@123              |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "Account not found!"

  Scenario: API 13.2 - Account update fails for non-existing user
    When the system receives a PUT request to "/api/updateAccount" with form data:
      | name     | Updated Name            |
      | email    | nonexisting@example.com |
      | password | NewPass@123             |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "Account not found!"

  Scenario: API 14.2 - User detail retrieval fails for non-existing email
    When the system receives a GET request to "/api/getUserDetailByEmail" with parameter:
      | email | nonexisting@example.com |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "Account not found with this email, try another email!"

  Scenario: API 14.3 - User detail retrieval fails without email parameter
    When the system receives a GET request to "/api/getUserDetailByEmail" without parameters
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email parameter is missing in GET request."
