export class Utility {
    getBaseUrl() {
        let envi = Cypress.env('ENV');
        if (envi === 'production')
            return "https://www.thesun.co.uk/";
        else if (envi === 'staging')
            return "https://www.staging-thesun.co.uk/";
        else if (envi === 'dev05')
            return "https://www-dev-05.uat-thesun.co.uk/";
    }
}
