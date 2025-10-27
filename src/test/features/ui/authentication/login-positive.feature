@ui @authentication @login @positive
Feature: User Login - Successful Login
  As a registered user
  I want to authenticate with my credentials
  So that I can access my account and personalized features

  Background:
    Given the user is created
    And the user is on the home page

  @smoke 
  Scenario: A registered user successfully logs in
    When the user logs in with valid credentials
    Then the user is authenticated

  Scenario: Authenticated user name is displayed in header
    Given the user is logged in
    Then the user's name is displayed in the header

  Scenario: A logged-in user logs out successfully
    Given the user is logged in
    When the user logs out
    Then the user is logged out

  Scenario: User is redirected to login page after logout
    Given the user is logged in
    When the user logs out
    Then the login page is displayed
