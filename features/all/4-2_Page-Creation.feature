Feature: Page Creation

@user1 @web 
Scenario: PA018-K - Create a page with special characters
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to page page
    When the user creates and publishes the page with special characters
    Then the user should see the page with special characters published