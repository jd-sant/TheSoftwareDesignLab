Feature: Tag Creation

@user1 @web 
Scenario: PA008-K - Create a tag
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to tag page
    When the user creates a tag
    Then the user should see the tag with all field filled