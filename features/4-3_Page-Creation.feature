Feature: Page Creation

@user1 @web 
Scenario: PA017-K - Create a page with an invalid long title
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to page page
    When the user creates and publishes the page with a title over 255 characters
    Then the user should see an error in the publishing