# Headline validation

## Prerequisite.
- Chrome
- Node (Tested on v16.14.0) | npm (8.3.1)

## Getting started
Once in the main test repo, run `npm i` to install dependencies

## Running UI tests
`npm run test:chrome` runs cypress in Chrome browser

`npm run open:cypress` opens cypress GUI. Select E2E Testing then you can select available browsers such as chrome, electron etc

## Assumptions
- We are matching the words from source website and validating against google search. 
- If the half (or the number in threshold) match then test will pass, otherwise it will fail to match thus failing the test.

## Limitations
- fail to work on firefox due to fault with existing test system during installation. Tested on chrome and electron

## Task
###603 – Software Development Engineer in Test (Web/Mobile)
Imagine you are building news validation site to prevent fake news. You first story is to confirm that news from https://www.theguardian.com/tone/news is valid. The product owner wants to start with a simple confirmation by checking other sources to confirm a news article is valid. For the first news article on https://www.theguardian.com/tone/news your task is to search google/other resources for similar information to confirm that the article is valid. If two or more articles exist on Google or another resource then we consider the first Guardian news article to be valid.  
Using Cucumber, Selenium or Appium, and Java, create a few scenarios to achieve this functionality.
Please consider this assignment as if you were implementing this for a real project. Assessment will be done as if this was part of production delivery. In doing so, you will be assessed on the following:
•	Quality of BDD scenarios – note that scenarios should be considered from a business or user journey perspective
•	Quality of test coverage
•	Code clarity and maintainability
•	Project Structure
•	Design patterns and abstraction
•	Ease of determining test failure(s) reason
•	Dependency management
