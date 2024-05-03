Feature: My feature

@user2 @web 
Scenario: My scenario 1
  Given I navigate to page "<URL>"
  And I login "<USERNAME1>" "<PASSWORD1>"
  When  I wait for 2 seconds
  Then I see the button with text retry