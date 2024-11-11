Feature: Post Creation

@user1 @web 
Scenario: PA006-K - Create a post with unplash images
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to post page
    When the user creates and publishes the post with unplash images
    Then the user should see the post published