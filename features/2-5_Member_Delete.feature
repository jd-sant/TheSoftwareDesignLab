Feature: Member Creation

@user1 @web 
Scenario: PA012-K - Delete a member
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to member page
    When the user deletes a member
    Then the user should not see the member deleted