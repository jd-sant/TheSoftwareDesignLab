Feature: Tag Creation

@user1 @web 
Scenario: PA009-K - Create a tag with all fields left blank
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to tag page
    When the user creates a tag with all fields left blank
    Then the user should see that the tag was not created