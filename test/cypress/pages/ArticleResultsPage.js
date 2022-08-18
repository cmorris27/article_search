require('cypress-iframe');

class ArticleResultsPage {

    elements = {
        headlineText: () => cy.get('section[data-link-name*="container-1"] .js-headline-text'),
        googleGDPRButtons: () => cy.get('button'),
        googleSearchInput: () => cy.get('input[name="q"]'),
    }

    acceptGDPR() {
        cy.get('[id="sp_message_container_658013"] iframe')
            .its('0.contentDocument')
            .its('body')
            .then(cy.wrap)
            .find('.message-component.message-row .btn-primary').should('be.visible')
            .click();
    }

    getFirstHeadlineThenSearchInGoogle() {
        this.elements.headlineText().first().then(el => {
            Cypress.env('first_article_headline', el.text());
            const url = `https://www.google.co.uk`;
            const query = Cypress.env('first_article_headline');
            cy.origin(url, () => {
                cy.visit('/');
                Cypress.on('uncaught:exception', (err, runnable) => {
                    return false;
                });
            });
            this.elements.googleGDPRButtons()
                .contains('Accept all')
                .click();
            this.elements.googleSearchInput()
                .type(query)
                .type('{enter}');
        })
    }

    verifyKeywordPartiallyMatchesSearchResult(count, threshold) {
        const phrase = Cypress.env('first_article_headline').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const mySet1 = new Set(['and', 'of', 'a', 'an', 'on', 'in']);
        const keywords = phrase.split(' ').filter(word => !mySet1.has(word));

        let accepted = 0
        cy.get('#search h3:not([role="heading"])').then(titles => {
            titles.slice(0, count).each((_, $ele) => {
                // counting the number of words from phrase that are in the title
                let matched_words = 0;
                keywords.forEach(word => {
                    if ($ele.innerText.includes(word)) {
                        matched_words++
                    }
                })
                cy.log("MATCHED WORDS======>", matched_words);
                // playing with the pass/fail threshold here
                if (matched_words >= keywords.length / threshold) {
                    accepted++;
                    cy.log('Search Successful for ' + ($ele.innerText))
                } else {
                    cy.log('Search Unsuccessful for ' + ($ele.innerText))
                }
            });
            expect(accepted).to.equals(parseInt(count), `***POSSIBLE FAKE NEWS FOUND IN RESULTS*** ${accepted} titles matched out of ${parseInt(count)}`);
        })
    }
}

module.exports = new ArticleResultsPage();
