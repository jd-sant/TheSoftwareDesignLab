Feature: Post Creation

@user1 @web 
Scenario: PA007-K - Create a post with multiple languages
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to post page
    When the user creates and publishes the post with title only
    Then the user should see the post published