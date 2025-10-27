@ui @products @validation @negative
Feature: Product Browsing and Search - Business Validations
  As a system
  I want to validate search behavior and edge cases
  So that users get accurate search results

  Background:
    Given the user is on the products page

  @search
  Scenario: Customer searches for a non-existent product
    When the user searches for "NonExistentProduct123"
    Then search results are displayed
    But no products are found
