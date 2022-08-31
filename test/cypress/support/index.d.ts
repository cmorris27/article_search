declare namespace Cypress {
    interface Chainable<Subject> {
        generateNonce(): Chainable<any>
        generateCookie(): Chainable<any>
        generateNonceFromCookie(): Chainable<any>
        getCookieFromHTML(): Chainable<any>
    }
}
