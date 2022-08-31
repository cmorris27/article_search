import {Utility} from "../../../support/utility";

function deletePost(postId) {
    const utility = new Utility();
    const baseUrl = utility.getBaseUrl();
    cy.log(`Attempting to delete post with id of ${postId}`)
        cy.request({
            url: baseUrl + `/wp-json/wp/v2/posts/${postId}`,
            method: 'DELETE',
            headers: {
                'X-WP-Nonce': Cypress.env('wp_nonce'),
                'Cookie': Cypress.env('wp_cookie'),
            },
        }).as('deletePostResponse').then((res) => {
            expect(res.status).to.eq(200);
            // cy.log("DELETE RESPONSE========>", JSON.stringify(res.body));
            expect(res.body).property('status').to.equals("trash");
        });
};

export { deletePost };
