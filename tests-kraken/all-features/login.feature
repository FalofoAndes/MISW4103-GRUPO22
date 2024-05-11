Feature: Login into Ghost
    As an user I want to authenticate myself within ghost cms website in order to create post
@user1 @web

Scenario Outline: Login failed with wrong email and password
  Given I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/signin"
  And I wait for 5 seconds 
  And I take a screenshot "FeatureLogin" "SC1Step1"
  When I enter email <email>
  And I take a screenshot "FeatureLogin" "SC1Step2"
  And I enter password <password>
  And I take a screenshot "FeatureLogin" "SC1Step3"
  And I click view with selector "#ember10"
  And I wait for 2 seconds
  Then I see the button with text retry
  And I take a screenshot "FeatureLogin" "SC1Step4"
 
  Examples:
      | email | password |  
      |"wrongemail@email.com"  |"123456"   |
    


@user2 @web

Scenario Outline: Login failed without email and password
  Given I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/signin"
  And I wait for 5 seconds
  And I take a screenshot "FeatureLogin" "SC2Step1"
  When I enter email <email>
  And I take a screenshot "FeatureLogin" "SC2Step2"
  And I enter password <password>
  And I take a screenshot "FeatureLogin" "SC2Step3"
  And I click view with selector "#ember10"
  And I wait for 2 seconds
  Then I see the button with text retry
  And I see the text "Please fill out the form to sign in."
  And I take a screenshot "FeatureLogin" "SC2Step4"
 
  Examples:
      | email | password |  
      |""|""|
    


@user3 @web

Scenario Outline: Login failed with email correct and password incorrect
  Given I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/signin"
  And I wait for 5 seconds
  And I take a screenshot "FeatureLogin" "SC3Step1"
  When I enter email <email>
  And I take a screenshot "FeatureLogin" "SC3Step2"
  And I enter password <password>
  And I take a screenshot "FeatureLogin" "SC3Step3"
  And I click view with selector "#ember10"
  And I wait for 2 seconds
  Then I see the button with text retry
  And I see the text "Your password is incorrect."
  And I take a screenshot "FeatureLogin" "SC3Step4"
 
  Examples:
      | email | password |  
      |"pruebauniandes@uniandes.edu.co"|"123456789"|

    

@user4 @web

Scenario Outline: Login failed user with email correct and password correct but not register
  Given I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/signin"
  And I wait for 5 seconds
  And I take a screenshot "FeatureLogin" "SC4Step1"
  When I enter email <email>
  And I take a screenshot "FeatureLogin" "SC4Step2"
  And I enter password <password>
  And I take a screenshot "FeatureLogin" "SC4Step3"
  And I click view with selector "#ember10"
  And I wait for 2 seconds
  Then I see the button with text retry
  And I see the text "There is no user with that email address."
  And I take a screenshot "FeatureLogin" "SC4Step4"
 
  Examples:
      | email | password |  
      |"uniandes@uniandes.edu.co"|"Uniandes12345678@"|