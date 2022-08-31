Cypress.Commands.add('generateNonce', () => {
    cy.window().then((win) => {
        Cypress.env('wp_nonce', win.eval('wpApiSettings').nonce);
        cy.log('NONCE=========>', Cypress.env('wp_nonce'));
    });
})

Cypress.Commands.add('generateCookie', () => {
    cy.getCookies().then((cookies) => {
        let filtered_result = cookies.filter((obj) => obj.name.includes('wordpress_logged_in_'));
        for (let index in filtered_result) {
            const wp_cookie = filtered_result[index].name + ':' + filtered_result[index].value;
            Cypress.env('wp_cookie', wp_cookie);
            cy.log('Cookie========>', Cypress.env('wp_cookie'));
        }
    });
})

Cypress.Commands.add('generateNonceFromCookie', () => {
    cy.exec('curl -i -L -X POST -F "log=chris.morris2@news.co.uk" -F "pwd=Passw0rd1!" -F "wp-submit=Log In" -F "redirect_to=https://www-dev-05.uat-thesun.co.uk/wp-admin/" -F "testcookie=1" https://www-dev-05.uat-thesun.co.uk/wp-login.php').then(result => {
        let res = result.stdout.split("\r\n\r\n")[0].split("\r\n").filter(function (item) {
            return item.toLowerCase().startsWith("set-cookie:");
        }).map((item) => {
            return item.split(':')[1].split(';')[0]
        }).join(';')
        Cypress.env('generated_wp_cookies', ` --cookie "Cookie=${res}"`);
        cy.exec(`curl -i -L -X POST -F "log=chris.morris2@news.co.uk" -F "pwd=Passw0rd1!" -F "wp-submit=Log In" -F "redirect_to=https://www-dev-05.uat-thesun.co.uk/wp-admin/" -F "testcookie=1" https://www-dev-05.uat-thesun.co.uk/wp-login.php ${Cypress.env('generated_wp_cookies')}`).then(res2 => {
            cy.log('RESPONSE-------->', JSON.stringify(res2));
        })
    });
})


