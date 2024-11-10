Feature: Member Creation

@user1 @web 
Scenario: PA010-K - Create a member with an existing email
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to member page
    When the user creates and tries to save a member with an existing email
    Then the user should see an existence error on the input email