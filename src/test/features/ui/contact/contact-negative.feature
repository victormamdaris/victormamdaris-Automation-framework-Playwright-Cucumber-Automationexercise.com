@ui @contact @validation @negative
Feature: Customer Support Contact - Business Validations
  As a system
  I want to validate contact form requirements
  So that only complete submissions are accepted

  Background:
    Given the user is on the contact page

  Scenario Outline: Customer cannot submit incomplete contact form
    When the user attempts to submit a contact form with name "<name>", email "<email>", subject "<subject>", and message "<message>"
    Then the form submission is rejected
    And the user remains on the contact page

    Examples:
      | name      | email           | subject | message      |
      |           | test@test.com   | Help    | Test message |
      | Test User |                 | Help    | Test message |
      | Test User | test@test.com   |         | Test message |
      | Test User | test@test.com   | Help    |              |
