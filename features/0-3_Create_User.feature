Feature: Create user

@user1 @web 
Scenario: PA003-K - Bad email login with the new user
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    When the user has logged in Ghost with wrong email "jack-sparrow@pirate.org" and pass "<PASSWORD>"
    Then the user should see an email message error
