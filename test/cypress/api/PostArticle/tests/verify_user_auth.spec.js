const loginPage = require('../../../pages/LoginPage');
import { sendPost } from "../requests/POST.SendPost.request";
import { getPosts } from "../requests/GET.GetPosts.request";
Cypress.env('random_id', Math.floor(Math.random() * 10000000));

describe("Creating a wordpress post", () => {
    beforeEach(() => {
        loginPage.login(Cypress.env('username'), Cypress.env('password'));
        cy.generateNonce();
        cy.generateCookie()
    })
    context("When I send POST /wp-json/wp/v2/posts/", () => {
        it("should be authenticated and send post", () => {
            sendPost('cypress_wp_test_post_' + Cypress.env('random_id'), 'publish', 'Test wp post content', 'cypress_wp_test_post')
            getPosts();
            cy.get('@getPostsRequest').then((res) => {
                cy.log("RANDOM_ID======>", Cypress.env('random_id'));
                let filtered_result = res.body.filter((obj) => obj.title.rendered.includes(Cypress.env('random_id')));
                for (let index in filtered_result) {
                    const filtered_body = filtered_result[index];
                    const title = filtered_result[index].title.rendered;
                    const content = filtered_result[index].content.raw;
                    const slug = filtered_result[index].slug;
                    const author = filtered_result[index].structured_data.author.name;
                    expect(JSON.stringify(filtered_result)).contains('"title":{"rendered":' + JSON.stringify(title));
                    expect(JSON.stringify(filtered_result)).contains(JSON.stringify(slug));
                }
            })
        });
    });
});


