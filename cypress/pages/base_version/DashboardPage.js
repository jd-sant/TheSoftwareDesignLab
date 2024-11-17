const delay = Cypress.env('delay') || 300;
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';
const idNavigateMember = 'a[data-test-nav="members"]';
const dashboardHeading = '.gh-onboarding-header h2';
const idNavigateTags = 'ul.gh-nav-list.gh-nav-manage > li > a[href="#/tags/"]';
const idNavigateNewPage = '#ember28';
const idNavigateCreatePage = 'a[data-test-new-page-button]';

class DashboardPage {
    // Contador para los screenshots
    screenshotCounter = 0;
    currentTest = Cypress.currentTest?.title || 'unnamedTest';

    /**
      * Toma un screenshot con un nombre único y ordenado.
      * @param {string} name - Nombre del screenshot.
      */
    takeScreenshot(name) {
        const pathScreenShot = Cypress.currentTest.title
        if (pathScreenShot != this.currentTest){
            this.currentTest = Cypress.currentTest.title
            this.screenshotCounter = 0
            this.datetime = new Date().toISOString().replace(/:/g,".");
        }
        const formattedCounter = String(this.screenshotCounter).padStart(3, '0'); // Formatea el número con ceros iniciales
        const screenshotName = `${formattedCounter}_${name}`;
        // cy.screenshot(`${this.datetime}-${pathScreenShot}/${screenshotName}`);
        cy.screenshot(`${pathScreenShot}/${screenshotName}`);
        this.screenshotCounter++; // Incrementa el contador
        
    }

    NavigateToPostPage() {
        cy.get(idNavigateNewPost).click();
        this.takeScreenshot('NavigateToPostPage');
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