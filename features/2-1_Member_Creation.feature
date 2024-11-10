Feature: Post Creation

@user1 @web 
Scenario: PA008-K - Create a member
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to member page
    When the user creates and saves a member
    Then the user should see the created member