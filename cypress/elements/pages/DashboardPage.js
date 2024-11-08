const delay = Cypress.env('delay') || 300;

class DashboardPage {

    thenSeeDashboardOnboarding() {
        cy.get('.gh-onboarding-header h2').should('have.text', 'Let’s get started!');
        cy.wait(delay);
    };

    thenGoToNewPostPage() {
        cy.get('#ember20').click();
        cy.wait(delay);
    };

}

export const dashboardPage = new DashboardPage();