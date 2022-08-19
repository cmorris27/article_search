import {Given, Then} from 'cypress-cucumber-preprocessor/steps'
import 'cypress-iframe';
const articlePage = require('../../pages/ArticleResultsPage')

// Given(/^User has saved the first article headline from "([^"]*)" page and performs a search in google$/, function (page) {
//     cy.visit(Cypress.env('baseUrl') + page);
//     articlePage.acceptGDPR();
//     articlePage.getFirstHeadlineThenSearchInGoogle();
// });
// Then(/^Saved keyword should return a minimum of "([^"]*)" search results for threshold of "([^"]*)"$/, function (count, threshold) {
//     articlePage.verifyKeywordPartiallyMatchesSearchResult(count, threshold);
// });
// Then(/^words matched should be returned in the top "([^"]*)" search results if threshold of "([^"]*)" is applied$/, function (count, threshold) {
//     articlePage.verifyKeywordPartiallyMatchesSearchResult(count, threshold);
// });
Given(/^User visits "([^"]*)" page and accepts on GDPR$/, function (page) {
    cy.visit(Cypress.env('baseUrl') + page);
    articlePage.acceptGDPR();
});
When(/^User performs a search on google for the saved headline$/, function () {
    articlePage.getFirstHeadline();
    articlePage.searchArticleHeadlineInGoogle();
});
Then(/^log the matched words returned in the top "([^"]*)" search results where threshold of "([^"]*)" is applied$/, function (count, threshold) {
    articlePage.verifyKeywordPartiallyMatchesSearchResult(count, threshold);

});
