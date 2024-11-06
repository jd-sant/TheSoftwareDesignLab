const url = Cypress.config('baseUrl') || 'http://localhost:3001';
const delay = Cypress.env('delay') || 300;

class HomePage {

    givenGoToCreateAdminPage() {
        cy.visit(url + '/ghost/#/setup'); 
        cy.wait(delay);
    };


}

export const homePage = new HomePage();