Feature: Member Creation

@user1 @web 
Scenario: PA011-K - Edit a member
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to member page
    When the user edits and save a member
    Then the user should see the member edited