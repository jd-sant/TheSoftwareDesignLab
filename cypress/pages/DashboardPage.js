const delay = Cypress.env('delay') || 300;
const idNavigateNewPost = '#ember20';

class DashboardPage {

    NavigateToPostPage() {
        cy.get(idNavigateNewPost).click();
        cy.wait(delay);
    };

}

export const dashboardPage = new DashboardPage();