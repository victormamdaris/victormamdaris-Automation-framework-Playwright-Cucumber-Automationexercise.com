@ui @authentication @login
Feature: User Login
  As a user
  I want to be able to login to the application
  So that I can access my account

  Background:
    Given the user is created

  @smoke @positive
  Scenario: Successful login with valid credentials
    And I am on the home page
    When I navigate to login page
    And the user is logged in
    Then I should be logged in successfully
    And I should see my username in the header

  @negative
  Scenario: Login with invalid credentials
    When I login with invalid email and password
    Then I should see an error message "Your email or password is incorrect!"

  @negative
  Scenario Outline: Login with missing credentials
    When I enter email "<email>" and password "<password>"
    And I click on login button
    Then I should remain on the login page

    Examples:
      | email              | password |
      |                    | Test@123 |
      | test@example.com   |          |
      |                    |          |

  @positive
  Scenario: Logout functionality
    When I login with valid credentials
    Then I should be logged in successfully
    When I click on logout
    Then I should be redirected to login page
