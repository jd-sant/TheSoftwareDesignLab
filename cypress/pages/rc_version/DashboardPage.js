const delay = Cypress.env('delay') || 300;
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';
const idNavigateMember = 'a[data-test-nav="members"]';
const dashboardHeading = '.gh-onboarding-header h2';
const idNavigateTags = 'a[data-test-nav="tags"]';
const idNavigateNewPage = '#ember28';
const idNavigateCreatePage = 'a[data-test-new-page-button]';
import { screenshot } from '../Screenshots';

class DashboardPage {

    NavigateToPostPage() {
        cy.get(idNavigateNewPost).click();
        screenshot.takeScreenshot('NavigateToPostPage');
        cy.wait(delay);
    };

    NavigateToTagsPage() {
        cy.get(idNavigateTags).click();
        cy.wait(delay);
    };
    
    SeeDashboard() {
        cy.get(dashboardHeading).should('have.text', 'Let’s get started!');
        cy.wait(delay);
    }

    NavigateToPagePage() {
        cy.get(idNavigateNewPage).click();
        cy.wait(delay);
        cy.get(idNavigateCreatePage).click();
        cy.wait(delay);
    };

    NavigateToMemberPage() {
        cy.get(idNavigateMember).click();
        cy.wait(delay);
    };

}

export const dashboardPage = new DashboardPage();