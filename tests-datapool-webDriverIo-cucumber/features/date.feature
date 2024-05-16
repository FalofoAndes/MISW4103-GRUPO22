 Feature: Configure publish date in post

 Scenario Outline: I configure publish date in post

    Given I go to ghost
    When I login with "pruebauniandes@uniandes.edu.co" and "Uniandes123456"
    And I enter in the first post in the list
    And I enter in settings
    And I put "<date>" in date publish of post
    Then I see the date's error "<error>"

    Examples:
      |      date       |         error                             |
      |    Texto        |  Invalid date format, must be YYYY-MM-DD  |
      |   0111-00-01    |  Invalid date                             |
      |     %&$#/       |  Invalid date format, must be YYYY-MM-DD  |
      |   2100-01-01    |  Must be in the past                      |
      |   1000-01-01    |  Invalid date                             |
  
Scenario Outline: I configure publish date in post

    Given I go to ghost
    When I login with "pruebauniandes@uniandes.edu.co" and "Uniandes123456"
    And I enter in the first post in the list
    And I enter in settings
    And I put "<date>" in date publish of post with API
    Then I see the date's error "<error>"

    Examples:
      |      date         |         error                             |
      |      text         |  Invalid date format, must be YYYY-MM-DD  |
      |     invalid       |  Invalid date                             |
      |     specials      |  Invalid date format, must be YYYY-MM-DD  |
      |     future        |  Must be in the past                      |
      |     past          |  Invalid date                             |  
 
 Scenario Outline: I configure publish date in post

    Given I go to ghost
    When I login with "pruebauniandes@uniandes.edu.co" and "Uniandes123456"
    And I enter in the first post in the list
    And I enter in settings
    And I put "<date>" in date publish of post with faker
    Then I see the date's error "<error>"

    Examples:
      |      date         |         error                             |
      |      text         |  Invalid date format, must be YYYY-MM-DD  |
      |     invalid       |  Invalid date                             |
      |     specials      |  Invalid date format, must be YYYY-MM-DD  |
      |     future        |  Must be in the past                      |
      |     past          |  Invalid date                             |









