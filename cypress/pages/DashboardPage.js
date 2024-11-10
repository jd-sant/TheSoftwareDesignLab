const delay = Cypress.env('delay') || 300;
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';
const idNavigateMember = 'a[data-test-nav="members"]';
const dashboardHeading = '.gh-onboarding-header h2';

class DashboardPage {

    NavigateToPostPage() {
        cy.get(idNavigateNewPost).click();
        cy.wait(delay);
    };

    NavigateToMemberPage() {
        cy.get(idNavigateMember).click();
        cy.wait(delay);
    };
    
    SeeDashboard() {
        cy.get(dashboardHeading).should('have.text', 'Let’s get started!');
        cy.wait(delay);
    }

}

export const dashboardPage = new DashboardPage();