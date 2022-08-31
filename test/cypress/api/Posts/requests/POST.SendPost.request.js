import {Utility} from "../../../support/utility";

const url = new Utility().getBaseUrl();

function sendPost(title, status, content, slug) {
    cy.request({
        url: url + 'wp-json/wp/v2/posts/',
        method: "POST",
        headers: {
            'X-WP-Nonce': Cypress.env('wp_nonce'),
            'Cookie': Cypress.env('wp_cookie'),
        },
        body: {
            "title": title,
            "status": status,
            "content": content,
            "slug": slug,
        },
        failOnStatusCode: false,
    }).as('sendPostRequest').then((res) => {
        expect(res.status).to.eq(201)
        Cypress.env('wp_post_id', JSON.stringify(res.body.id));
        cy.log('POST ID===========>', JSON.stringify(res.body.id));
    });
};

export {sendPost};

