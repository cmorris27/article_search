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
            this.elements.googleGDPRButtons().contains('Accept all').click();
            this.elements.googleSearchInput().type(query).type('{enter}');
        })
    }

}

module.exports = new ArticleResultsPage();
