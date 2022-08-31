Feature: Test authentication

  @smoke
  Scenario: Test wp authentication
    Given I am authenticated
    And I create a new article via the wordpress endpoint
    When User call GET on endpoint for newly created article
