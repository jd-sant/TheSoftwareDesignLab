Feature: Create user

@user1 @web 
Scenario: PA001-K - Create admin user
    Given the user has navigated to the Ghost site "<LOGIN_PAGE>"
    When the user fill and submit the form with site "<SITE_TITLE>" name "<FULL_NAME>" email "<EMAIL>" pass "<PASSWORD>"
    Then the user should see the dashboard
