import {Given, Then} from 'cypress-cucumber-preprocessor/steps'
import 'cypress-iframe';

const articlePage = require('../../pages/ArticleResultsPage')

Given(/^User has saved the first article headline from "([^"]*)" page and performs a search in google$/, function (page) {
    cy.visit(Cypress.env('baseUrl') + page);
    articlePage.acceptGDPR();
    articlePage.getFirstHeadlineThenSearchInGoogle();
});
Then(/^Saved keyword should return a minimum of "([^"]*)" search results for threshold of "([^"]*)"$/, function (count, threshold) {
    articlePage.verifyKeywordPartiallyMatchesSearchResult(count, threshold);
});
