Feature: Confirm that news from https://www.theguardian.com/tone/news can be validated
  As a User
  I want to be able to validate a headline against a search engine
  So that I can verify it's validity as to whether it is fake news or not

  Background:
    Given User visits "tone/news" page and accepts on GDPR

  Scenario: Verify headline from source can be validated against search engine
    When User performs a search on google for the saved headline
    Then log the matched words returned in the top "3" search results where threshold of "2" is applied

