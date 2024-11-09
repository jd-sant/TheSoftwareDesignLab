Feature: Post Creation

@user1 @web 
Scenario: PA004-K - Create a normal post
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to post page
    When the user creates and publishes the post "normal"