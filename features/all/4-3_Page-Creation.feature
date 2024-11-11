Feature: Page Creation

@user1 @web 
Scenario: PA019-K - Create a page with an invalid title with more than 255 letras
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to page page
    When the user creates and publishes the page with a title over 255 characters
    Then the user should see an error in the publishing