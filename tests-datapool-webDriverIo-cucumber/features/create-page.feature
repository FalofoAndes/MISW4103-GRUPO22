Feature: Create page in ghost

  Scenario Outline: I create page with data apriori

    Given I go to ghost
    When I login with "pruebauniandes@uniandes.edu.co" and "Uniandes123456"
    And I go to create page
    And I enter a "<title>"
    Then I see that the publish button there is "<Visibility>"
    
    Examples:
      | title                |   Visibility    |
      |                      |      Hide       |
      | Long Titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee   | Hide|
      |Normal Title          |    Displayed    |
      | ･✿ヾ╲(｡◕‿◕｡)╱✿･ﾟ  |    Displayed    |
 
 Scenario Outline: I create page with data API

    Given I go to ghost
    When I login with "pruebauniandes@uniandes.edu.co" and "Uniandes123456"
    And I go to create page
    And I enter a "<title>" for API
    Then I see that the publish button there is "<Visibility>"
    
    Examples:
      | title    |   Visibility    |
      | blank    |      Hide       |
      | long     |      Hide       |
      | normal   |    Displayed    |
      | special  |    Displayed    |


Scenario Outline: I create page with data faker

    Given I go to ghost
    When I login with "pruebauniandes@uniandes.edu.co" and "Uniandes123456"
    And I go to create page
    And I enter a "<title>" with faker
    Then I see that the publish button there is "<Visibility>"
    
    Examples:
      | title    |   Visibility    |
      | blank    |      Hide       |
      | long     |      Hide       |
      | normal   |    Displayed    |
      | special  |    Displayed    |
