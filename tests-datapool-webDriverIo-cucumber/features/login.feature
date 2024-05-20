Feature: Login in ghost

  Scenario Outline: As a user, I can log into the ghost 

    Given I go to ghost
    When I login with "<email>" and "<password>"
    Then I see the error "<error>"
    Examples:
    
      | email                            | password             | error                                    |
      |                                  |                      | Please fill out the form to sign in.     |
      | pruebauniandes@uniandes.edu.co   |                      | Please fill out the form to sign in.     |
      |                                  | Uniandes123456789    | Please fill out the form to sign in.     |
      | pruebauniandes@uniandes.edu.co   | wrongPassword123456  | Your password is incorrect.              |
      | uniandes@uniandes.edu.co         | wrongPassword123456  | There is no user with that email address.|

  Scenario Outline: As a user, I can log into the ghost with API
    
    Given I go to ghost
    When I login with data row "<rowApi>" email and password with API
    Then I see the error "<errorApi>"
    Examples:
    
      | rowApi | errorApi                              |
      |  72 | Please fill out the form to sign in.     |
      |  66 | Please fill out the form to sign in.     |
      |  13 | Please fill out the form to sign in.     |
      |  110  | Your password is incorrect.              |
      |  111  | There is no user with that email address.|
  
  Scenario Outline: As a user, I can log into the ghost with faker

    Given I go to ghost
    When I login with "<fakerEmail>" and "<fakerPassword>" faker
    Then I see the error "<FakerError>"
    Examples:

      |          fakerEmail           |      fakerPassword  |               FakerError                 |
      |                               |                     | Please fill out the form to sign in.     |
      |         <fakeEmail>           |                     | Please fill out the form to sign in.     |
      |                               |    <fakePassword>   | Please fill out the form to sign in.     |
      | pruebauniandes@uniandes.edu.co|    <fakePassword>   | Your password is incorrect.              |
      |         <fakeEmail>           |    <fakePassword>   | There is no user with that email address.|