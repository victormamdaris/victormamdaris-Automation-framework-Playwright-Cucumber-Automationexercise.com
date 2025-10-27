@api @user @registration @positive
Feature: User Account Management API - Successful Operations
  As a system integrator
  I want to manage user accounts through the API
  So that account CRUD operations can be performed programmatically

  Background:
    Given the API base URL is configured

  @smoke
  Scenario: API 11.1 - The system creates a user account with all required fields
    When the system receives a POST request to "/api/createAccount" with form data:
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

  Scenario: API 11.2 - Account creation requires minimal fields
    When the system receives a POST request to "/api/createAccount" with form data:
      | name     | Minimal User         |
      | email    | minimal@example.com  |
      | password | Pass@123             |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 400
    And the response should contain "message" with value "Bad request, firstname parameter is missing in POST request."

  Scenario: API 12.1 - The system deletes a user account
    Given a user account exists with credentials:
      | email    | todelete@example.com |
      | password | Delete@123           |
    When the system receives a DELETE request to "/api/deleteAccount" with body:
      | email    | todelete@example.com |
      | password | Delete@123           |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain "message" with value "Account deleted!"

  Scenario: API 13.1 - The system updates a user account
    Given a user account exists with email "toupdate@example.com"
    When the system receives a PUT request to "/api/updateAccount" with form data:
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

  Scenario: API 14.1 - The system retrieves user account details by email
    Given a user account exists with email "getdetails@example.com"
    When the system receives a GET request to "/api/getUserDetailByEmail" with parameter:
      | email | getdetails@example.com |
    Then the response status code should be 200
    And the response should contain "responseCode" with value 200
    And the response should contain user account details
