require('cypress-iframe');

class ArticleResultsPage {

    elements = {
        firstHeadlineText: () => cy.get('section[data-link-name*="container-1"] .js-headline-text'),
        results: () => cy.get('#search .g [data-sokoban-container]'),
        iframe: () => cy.get('[id="sp_message_container_658013"] iframe'),
        searchResults: () => cy.get('#search h3:not([role="heading"])'),
    }

    acceptGDPR() {
        const iframeContent = '0.contentDocument';
        const iframeBody = 'body';

        this.elements.iframe()
            .its(iframeContent)
            .its(iframeBody)
            .then(cy.wrap)
            .find('.message-component.message-row .btn-primary').should('be.visible')
            .click();
    }

    getFirstHeadline() {
        this.elements.firstHeadlineText().then(el => {
            cy.log("ELEMENT TEST=======>", el[0].innerText);
            Cypress.env('headline', el[0].innerText);
        })
    };

    searchArticleHeadlineInGoogle() {
        const url = 'https://www.google.co.uk';
        const args = {
            elements: {
                googleGDPRButtons: 'button',
                googleSearchInput: 'input[name="q"]',
            },
            options: {
                timeout: 5000,
            },
        };

        cy.origin(url, {args}, ({elements, options}) => {
            cy.visit('/', options);
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            });

            cy.get(elements.googleGDPRButtons)
                .contains('Accept all')
                .click();

            cy.get(elements.googleSearchInput)
                .should('be.visible')
                .type(Cypress.env('headline'))
                .type('{enter}');
        });
    }

    verifyResultsIncludeHrefToArticle() {
        this.elements.results().each(link => {
            expect(link.html().includes('href'));
        });
    }

    verifyKeywordPartiallyMatchesSearchResult(count, threshold) {
        const phrase = Cypress.env('headline').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const mySet1 = new Set(['and', 'of', 'a', 'an', 'on', 'in']);
        const keywords = phrase.split(' ').filter(word => !mySet1.has(word));

        let accepted = 0
        this.elements.searchResults().then(titles => {
            titles.slice(0, count).each((_, $ele) => {
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
            if (accepted) {
                cy.log(`${accepted} titles matched out of ${parseInt(count)}`)
                cy.log(`***POSSIBLE FAKE NEWS FOUND IN RESULTS*** - ${accepted} titles matched out of ${parseInt(count)}`);
            } else {
                cy.log(`${accepted} titles matched out of ${parseInt(count)}`)
            }
        })
    }
}

module.exports = new ArticleResultsPage();
