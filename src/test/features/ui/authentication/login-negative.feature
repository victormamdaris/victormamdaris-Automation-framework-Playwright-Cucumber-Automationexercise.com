@ui @authentication @login @validation @negative
Feature: User Login - Business Validations
  As a system
  I want to validate login attempts
  So that only authorized users can access the application

  Background:
    Given the user is on the login page

  Scenario: Login fails with invalid credentials
    When the user attempts to log in with invalid credentials
    Then an error message is displayed indicating incorrect credentials

  Scenario Outline: Login fails when credentials are missing
    When the user attempts to log in with email "<email>" and password "<password>"
    Then the login attempt fails
    And the user remains on the login page

    Examples:
      | email              | password |
      |                    | Test@123 |
      | test@example.com   |          |
      |                    |          |
