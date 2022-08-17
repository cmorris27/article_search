@article_search
Feature: Test

  Scenario: Test
    Given User has saved the first article headline from "tone/news" page and performs a search in google
    Then Saved keyword should return a minimum of "3" search results

