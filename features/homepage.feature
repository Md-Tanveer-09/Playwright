Feature: E-commerce app navigation
  As a user
  I want to open the e-commerce app
  So that I can verify its page URL

  @smoke
  Scenario: Open the home page
    Given I navigate to the "Home page"
    Then the page URL should match the "Home page"
    And the "Header" should be present
    And the "Navigation Bar" should be present
    And the "Body Content" should be present
    And the "Footer" should be present
    When I add "Beauty product 23" to the cart
    When I add "Books product 45" to the cart
    When I click on "Cart"
    Then the page URL should match the "Cart page"
    When I enter the coupon code "TESTHEON10"
    When I click on "Apply coupon"
    When I click on "Continue to checkout"
    When I click the "Sign in and continue" button
    # When I click the "Place fake order" button
    # When I click on "View order history"
  
