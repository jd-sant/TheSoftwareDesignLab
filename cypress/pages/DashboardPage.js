const delay = Cypress.env('delay') || 300;
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';

class DashboardPage {

    NavigateToPostPage() {
        cy.get(idNavigateNewPost).click();
        cy.wait(delay);
    };

    SeeDashboard() {
        cy.get('.gh-onboarding-header h2').should('have.text', 'Let’s get started!');
        cy.wait(delay);
    }

}

export const dashboardPage = new DashboardPage();