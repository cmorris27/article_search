import {Given, Then} from 'cypress-cucumber-preprocessor/steps'
import loginPage from "../../pages/LoginPage";
const {Utility} = require("../../support/utility");
const url = new Utility().getBaseUrl();

Given(/^I am authenticated$/, function () {
    loginPage.login(Cypress.env('username'), Cypress.env('password'));
    cy.generateNonce();
    cy.generateCookie()
});
Given(/^I create a new article via the wordpress endpoint$/, function () {
    cy.request({
        url: url + 'wp-json/wp/v2/posts/',
        method: 'POST',
        headers: {
            'X-WP-Nonce': Cypress.env('wp_nonce'),
            'Cookie': Cypress.env('wp_cookie'),
        },
        body: {
            title: 'Test_chris_1',
            status: 'draft',
            content: 'Some content',
            slug: 'test-chris-post',
        },
        failOnStatusCode: false,
    }).as('postArticleRequest').then((res) => {
        Cypress.env('wp_post_article_id', JSON.stringify(res.body.id));
        cy.log('POST ID===========>', JSON.stringify(res.body.id));
    });
});
When(/^User call GET on endpoint for newly created article$/, function () {
    cy.request({
        url: url + 'wp-json/wp/v2/posts/' + `${Cypress.env('wp_post_article_id')}`,
        method: 'GET',
        headers: {
            'X-WP-Nonce': Cypress.env('wp_nonce'),
            Cookie: Cypress.env('wp_cookie'),
        },
        failOnStatusCode: false,
    }).as('request').then((res) => {
        cy.log('GET BODY===========>', JSON.stringify(res.body));
    });
});
Then(/^the response should contain "([^"]*)"$/, function () {

});
