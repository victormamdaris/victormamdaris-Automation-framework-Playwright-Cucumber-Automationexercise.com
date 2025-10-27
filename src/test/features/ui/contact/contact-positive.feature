@ui @contact @positive
Feature: Customer Support Contact - Successful Submissions
  As a customer
  I want to contact the support team
  So that I can get assistance with my questions or issues

  Background:
    Given the user is on the contact page

  @smoke
  Scenario: Customer submits a contact request with valid information
    When the user submits a contact request with valid details
    Then a success confirmation is displayed

  Scenario: Customer is returned to home page after contact submission
    When the user submits a contact request with valid details
    Then a success confirmation is displayed
    When the user returns to the home page
    Then the home page is displayed

  Scenario: Customer submits a contact request with a file attachment
    When the user submits a contact request with valid details and a file attachment
    Then a success confirmation is displayed
