@ui @authentication @registration
Feature: User Registration
  As a new user
  I want to register an account
  So that I can use the application

  Background:
    Given the user is created
    And I am on the home page
    When I navigate to login page

  @smoke @positive
  Scenario: Successful registration with valid details
    When I enter signup name and email
    And I click on signup button
    Then I should be on the account information page
    When I fill all account details
    And I fill all address details
    And I click create account button
    Then I should see account created message
    When I click continue button
    Then I should be logged in successfully

  @negative
  Scenario: Registration with existing email
    When I enter signup name and existing email
    And I click on signup button
    Then I should see error message "Email Address already exist!"

  @positive
  Scenario: Delete account after registration
    When I complete the registration process
    Then I should be logged in successfully
    When I click delete account
    Then I should see account deleted message
    And I should be redirected to home page

  @regression
  Scenario: Register with all optional fields
    When I enter signup name and email
    And I click on signup button
    When I fill all account details including optional fields
    And I fill all address details including optional fields
    And I click create account button
    Then I should see account created message
    When I click continue button
    And account should have all details saved correctly
