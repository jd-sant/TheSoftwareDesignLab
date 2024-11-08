Feature: Registro y uso usuario administrador

@user1 @web
Scenario: E001 - Como administrador de la plataforma, quiero crear un usuario para administrar el sitio
  Given I navigate to page "http://localhost:3001/ghost"
  And I wait for 5 seconds
  When I enter site title "<SITE_TITLE>"
  And I wait for 1 seconds
  When I enter full name "<FULL_NAME>"
  And I wait for 1 seconds
  When I enter email "<EMAIL>"
  And I wait for 1 seconds
  When I enter password "<PASSWORD>"
  And I wait for 1 seconds
  When I click on submit button
  And I wait for 10 seconds
  Then I should see landing page for first time
  And I wait for 5 seconds
