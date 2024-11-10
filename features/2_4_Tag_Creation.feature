Feature: Tag Edition

@user1 @web 
Scenario: PA011-K - Edit a tag with all fields filled and cancel edit
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
    And the user has navigated to tag page
    When the user edits the tag with all fields filled and cancels the edit
    Then the user should see that the tag remains unchanged