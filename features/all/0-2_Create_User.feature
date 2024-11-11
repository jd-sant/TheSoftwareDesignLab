Feature: Create user

@user1 @web 
Scenario: PA002-K - Bad password login with the new user
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    When the user has logged in Ghost with email "<EMAIL>" and bad pass "badPass"
    Then the user should see a message error