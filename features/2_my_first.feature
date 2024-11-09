Feature: My feature

@user1 @web
Scenario: My scenario 1
  Given I navigate to page "http://localhost:3001/"
  And I waits for 1 seconds
  And the user has navigated to the Ghost site "<LOGIN_PAGE>"
  And the user has logged in Ghost with email "<EMAIL>" and pass "<PASSWORD>"
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I waits for 1 seconds