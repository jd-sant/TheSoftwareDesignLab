const delay = Cypress.env('delay') || 300;
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';
const idNavigateMember = 'nav[class="gh-nav ember-view"] > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(4) > :nth-child(1) ';
const dashboardHeading = '.gh-onboarding-header h2';
const idNavigateTags = 'ul.gh-nav-list.gh-nav-manage > li > a[href="#/tags/"]';
const idNavigateNewPage = '#ember39';
const idNavigateCreatePage = 'a[class="ember-view gh-btn gh-btn-primary view-actions-top-row"]';
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