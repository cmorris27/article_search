const {Utility} = require("../support/utility");
const url = new Utility().getBaseUrl();

class LoginPage {

    elements = {
        usernameInput: () => cy.get('[id="user_login"]', { timeout: 10000 }),
        passwordInput: () => cy.get('[id="user_pass"]'),
        signInBtn: () => cy.get('[id="wp-submit"]'),
    }

    typeUsername(username){
        this.elements.usernameInput().should("be.visible").type(username);
    }

    typePassword(password){
        this.elements.passwordInput().should("be.visible").type(password);
    }

    clickLogin(){
        this.elements.signInBtn().should("be.visible").click({ timeout: 10000 });
    }

    login(username, password) {
        cy.visit(url + 'wp-login.php');
        cy.wait(2000)
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
    }
}

module.exports = new LoginPage();
