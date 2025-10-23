@ui @contact
Feature: Contact Us
  As a user
  I want to contact the support team
  So that I can get help with my issues

  Background:
    Given I am on the home page

  @smoke @positive
  Scenario: Submit contact form with valid details
    When I navigate to contact us page
    Then I should see "Get In Touch" heading
    When I fill contact form with valid details
    And I submit the contact form
    Then I should see success message
    And I can return to home page

  @positive
  Scenario: Submit contact form with file attachment
    When I navigate to contact us page
    And I fill contact form with valid details
    And I attach a file to the form
    And I submit the contact form
    And I accept the confirmation dialog
    Then I should see success message

  @negative
  Scenario Outline: Submit contact form with missing fields
    When I navigate to contact us page
    And I enter name "<name>"
    And I enter email "<email>"
    And I enter subject "<subject>"
    And I enter message "<message>"
    And I submit the contact form
    Then form should not be submitted

    Examples:
      | name      | email           | subject | message      |
      |           | test@test.com   | Help    | Test message |
      | Test User |                 | Help    | Test message |
      | Test User | test@test.com   |         | Test message |
      | Test User | test@test.com   | Help    |              |
