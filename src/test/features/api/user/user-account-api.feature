@api @user @registration
Feature: User Account Management API
  As a developer
  I want to test user account management APIs
  So that I can verify user CRUD operations

  @smoke @positive
  Scenario: API 11.1 - POST To Create/Register User Account with all required fields
    When I send POST request to "/api/createAccount" with form data:
      | name              | Test User             |
      | email             | testuser@example.com  |
      | password          | Test@123              |
      | title             | Mr                    |
      | birth_date        | 15                    |
      | birth_month       | 5                     |
      | birth_year        | 1990                  |
      | firstname         | Test                  |
      | lastname          | User                  |
      | company           | Test Company          |
      | address1          | 123 Test Street       |
      | address2          | Apartment 4B          |
      | country           | United States         |
      | zipcode           | 12345                 |
      | state             | California            |
      | city              | Los Angeles           |
      | mobile_number     | 1234567890            |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Email already exists!"

  @positive
  Scenario: API 11.2 - POST To Create/Register User Account with minimal fields
    When I send POST request to "/api/createAccount" with form data:
      | name     | Minimal User         |
      | email    | minimal@example.com  |
      | password | Pass@123             |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, firstname parameter is missing in POST request."

  @negative
  Scenario: API 11.3 - POST To Create/Register User Account with existing email
    Given a user account exists with email "existing@example.com"
    When I send POST request to "/api/createAccount" with form data:
      | name     | Another User         |
      | email    | existing@example.com |
      | password | Test@123             |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, firstname parameter is missing in POST request."

  @negative
  Scenario: API 11.4 - POST To Create/Register User Account without email
    When I send POST request to "/api/createAccount" with form data:
      | name     | No Email User |
      | password | Test@123      |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email parameter is missing in POST request."

  @negative
  Scenario: API 11.5 - POST To Create/Register User Account without password
    When I send POST request to "/api/createAccount" with form data:
      | name  | No Password User     |
      | email | nopass@example.com   |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, password parameter is missing in POST request."

  @positive
  Scenario: API 12.1 - DELETE METHOD To Delete User Account
    Given a user account exists with credentials:
      | email    | todelete@example.com |
      | password | Delete@123           |
    When I send DELETE request to "/api/deleteAccount" with body:
      | email    | todelete@example.com |
      | password | Delete@123           |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain "message" with value "Account deleted!"

  @negative
  Scenario: API 12.2 - DELETE METHOD To Delete User Account without email
    When I send DELETE request to "/api/deleteAccount" with body:
      | password | Delete@123 |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email parameter is missing in DELETE request."

  @negative
  Scenario: API 12.3 - DELETE METHOD To Delete User Account with non-existing email
    When I send DELETE request to "/api/deleteAccount" with body:
      | email    | nonexisting@example.com |
      | password | Delete@123              |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "Account not found!"

  @positive
  Scenario: API 13.1 - PUT METHOD To Update User Account
    Given a user account exists with email "toupdate@example.com"
    When I send PUT request to "/api/updateAccount" with form data:
      | name       | Updated Name         |
      | email      | toupdate@example.com |
      | password   | NewPass@123          |
      | firstname  | Updated              |
      | lastname   | User                 |
      | company    | New Company          |
      | address1   | New Address          |
      | state      | New State            |
      | city       | New City             |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "Account not found!"

  @negative
  Scenario: API 13.2 - PUT METHOD To Update Non-Existing User Account
    When I send PUT request to "/api/updateAccount" with form data:
      | name     | Updated Name            |
      | email    | nonexisting@example.com |
      | password | NewPass@123             |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "Account not found!"

  @positive
  Scenario: API 14.1 - GET user account detail by email
    Given a user account exists with email "getdetails@example.com"
    When I send GET request to "/api/getUserDetailByEmail" with parameter:
      | email | getdetails@example.com |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain user account details

  @negative
  Scenario: API 14.2 - GET user account detail by non-existing email
    When I send GET request to "/api/getUserDetailByEmail" with parameter:
      | email | nonexisting@example.com |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 404
    And the response should contain "message" with value "Account not found with this email, try another email!"

  @negative
  Scenario: API 14.3 - GET user account detail without email parameter
    When I send GET request to "/api/getUserDetailByEmail" without parameters
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, email parameter is missing in GET request."
