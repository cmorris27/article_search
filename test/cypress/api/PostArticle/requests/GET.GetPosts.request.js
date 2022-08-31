import {Utility} from "../../../support/utility";

const url = new Utility().getBaseUrl();

function getPosts() {
    cy.request({
        url: url + 'wp-json/wp/v2/posts/',
        method: "GET",
        headers: {
            'X-WP-Nonce': Cypress.env('wp_nonce'),
            'Cookie': Cypress.env('wp_cookie'),
        },
        failOnStatusCode: false,
    }).as('getPostsRequest').then((res) => {
        Cypress.env('get_posts_request_body', JSON.stringify(res.body));
        // cy.log('POST BODY===========>', JSON.stringify(res.body));
    });
};

export {getPosts};

