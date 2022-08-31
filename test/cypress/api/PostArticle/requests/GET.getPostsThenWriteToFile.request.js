import {Utility} from "../../../support/utility";

function getAllPosts() {
    const baseUrl = new Utility().getBaseUrl();
    cy.request({
        url: baseUrl + '/wp-json/wp/v2/posts/',
        method: 'GET',
        headers: {
            'X-WP-Nonce': Cypress.env('wp_nonce'),
            'Cookie': Cypress.env('wp_cookie'),
        },
        failOnStatusCode: false
    }).as('getPostsResponse').then((res) => {
        expect(res.status).to.eq(200);
        cy.writeFile('cypress/fixtures/rundata/posts.json', res.body)
    });
};

export {getAllPosts};
