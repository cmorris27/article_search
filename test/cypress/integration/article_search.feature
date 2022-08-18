Feature: Confirm that news from https://www.theguardian.com/tone/news is valid

  Scenario Outline: Verify headline from source can be validated against search engine
    Given User has saved the first article headline from "<page>" page and performs a search in google
    Then Saved keyword should return a minimum of "<count>" search results for threshold of "<threshold>"

    Examples:
      | page      | count | threshold |
      | tone/news | 2     | 6         |
      | tone/news | 3     | 7         |
