import './commands'
import {deletePost} from "../api/Posts/requests/DELETE.deletePost.request";
import {getPosts} from "../api/Posts/requests/GET.getPosts.request";
Cypress.on('window:before:load', (win) => {
    const original = win.EventTarget.prototype.addEventListener;

    win.EventTarget.prototype.addEventListener = function () {
        if (arguments && arguments[0] === 'beforeunload') {
            return;
        }
        return original.apply(this, arguments);
    };

    Object.defineProperty(win, 'onbeforeunload', {
        get() { },
        set() { },
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

after(() => {
    getPosts();
    cy.get('@getPostsRequest').then((res) => {
        cy.writeFile('cypress/fixtures/rundata/posts.json', res.body)
    });
    cy.fixture('rundata/posts.json').then((data) => {
        let filtered_result = data.filter(obj => obj.parsely.meta.author[0].name.includes('Chris Morris'));
        for (let index in filtered_result) {
            const postId = Cypress.env('post_id', filtered_result[index].id);
            cy.log(`deleting post id '${postId}' for author`)
            deletePost(postId);
        }
    });
});


