Feature: Page Creation

@user1 @web 
Scenario: PA020-K - Create a page featured
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to page page
    When the user creates and publishes the page feature
    Then the user should see the publishing in the feature filter