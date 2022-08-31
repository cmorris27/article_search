import './commands'
import {getAllPosts} from "../api/PostArticle/requests/GET.getPostsThenWriteToFile.request";
import {deletePost} from "../api/PostArticle/requests/DELETE.deletePost.request";
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
    getAllPosts();
    cy.fixture('rundata/posts.json').then((data) => {
        let filtered_result = data.filter(obj => obj.parsely.meta.author[0].name.includes('Chris Morris'));
        for (let index in filtered_result) {
            const postId = Cypress.env('post_id', filtered_result[index].id);
            cy.log(`deleting post id '${postId}' for author`)
            deletePost(postId);
        }
    });
});


