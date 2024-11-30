const delay = Cypress.env('delay') || 300;
const url = Cypress.config('baseUrl') || 'http://localhost:3001';
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';
const idNavigateMember = 'a[data-test-nav="members"]';
const dashboardHeading = '.gh-onboarding-header h2';
const idNavigateTags = 'a[data-test-nav="tags"]';
const idNavigateSettings = 'a[data-test-nav="settings"]';
const idNavigateNewPage = '#ember28';
const idNavigateCreatePage = 'a[data-test-new-page-button]';
import { screenshot } from '../support/Screenshots';

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

    NavigateToSettingsPage() {
        cy.get(idNavigateSettings).click();
        cy.wait(delay)
    }
    
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

    NavigateToDashboard() {
        cy.visit(url + '/ghost/#/dashboard');
        cy.wait(delay);
    };

}

export const dashboardPage = new DashboardPage();