@ui @authentication @registration @validation @negative
Feature: User Registration - Business Validations
  As a system
  I want to validate registration rules
  So that data integrity and business policies are enforced

  Scenario: Registration fails when using an existing email
    Given the user is created
    And the user is on the home page
    And an account already exists with a specific email
    When the user attempts to register with that email
    Then an error message indicates the email is already in use
