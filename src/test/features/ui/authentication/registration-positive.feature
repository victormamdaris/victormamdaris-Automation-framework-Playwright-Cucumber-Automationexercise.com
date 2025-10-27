@ui @authentication @registration @positive
Feature: User Registration - Successful Registration
  As a new visitor
  I want to create an account
  So that I can access personalized features and make purchases

  Background:
    Given the user is on the home page

  @smoke 
  Scenario: A new user successfully creates an account
    When the user registers with valid account information
    Then the account is created
    And the account creation success message is displayed

  Scenario: A newly registered user is automatically logged in
    When the user registers with valid account information
    Then the user is authenticated

  Scenario: A registered user can delete their account
    Given the user has successfully registered
    And the user is authenticated
    When the user deletes their account
    Then the account deletion is confirmed
    And the home page is displayed

  @regression
  Scenario: A user registers with complete profile information
    When the user registers with complete account information including optional fields
    Then the account is created

  Scenario: Registered user profile contains all provided details
    Given the user has registered with complete account information
    When the user views their profile
    Then all provided details are displayed in the profile
