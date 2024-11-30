const delay = Cypress.env('delay') || 300;
const settingsButton = 'a[data-test-nav="settings"]';
const editSiteNameButton = '#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button';
const siteNameField = 'input[placeholder="Site title"]';
const siteDescriptionField = 'input[placeholder="Site description"]';
const saveButton = 'div[data-testid="title-and-description"] > div:nth-child(2) > div:nth-child(2)  > div:nth-child(1)  > button:nth-child(2)';
const saveButtonPrivate = 'div[data-testid="locksite"] > div:nth-child(2) > div:nth-child(2)  > div:nth-child(1)  > button:nth-child(2)';
const privateButton = '[data-testid="locksite"] > .items-start > :nth-child(2) > .flex > .cursor-pointer > span';
const buttonEnablePrivate = 'button[data-state="unchecked"]';
const passwordInput = 'input[placeholder="Enter password"]';
const viewSiteLink = 'a[data-test-nav="site"]';
const sitePassword = 'input[class="gh-input"]';
const accessSiteButton = 'button[class="gh-btn"]';
const headerSite = 'header[id="gh-navigation"]';

import { screenshot } from '../support/Screenshots';
import { dashboardPage } from './DashboardPage';

const getIframeBody = () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
    .get('iframe[class="site-frame "]')
    .its('0.contentDocument.body').should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap)
  }

class SettingsPage {

    CanChangeSiteDescription(baseData){
        cy.get(settingsButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('SettingsButton');
        cy.wait(delay);
        cy.get(editSiteNameButton).click();
        screenshot.takeScreenshot('EditSiteNameButton');
        cy.get(siteNameField).clear();
        cy.get(siteNameField).type(baseData.siteNameField, { force: true });
        screenshot.takeScreenshot('SiteNameField');
        cy.get(siteDescriptionField).clear();
        cy.get(siteDescriptionField).type(baseData.siteDescriptionField, { force: true });
        screenshot.takeScreenshot('SiteDescriptionField');
        cy.get(saveButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('SaveButton');
    }

    PrivatizateSite(baseData){
        cy.get(settingsButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('SettingsButton');
        cy.wait(delay);
        cy.get(privateButton).click();
        screenshot.takeScreenshot('PrivateButton');
        cy.wait(delay);
        cy.get(buttonEnablePrivate).click();
        screenshot.takeScreenshot('ButtonEnablePrivate');
        cy.wait(delay);
        cy.get(passwordInput).type(baseData.sitePassword, { force: true });
        screenshot.takeScreenshot('PasswordInput');
        cy.wait(delay);
        cy.get(saveButtonPrivate).click(); 
        screenshot.takeScreenshot('SaveButtonPrivate');
    }

    AccessSiteWithPassword(baseData){
        dashboardPage.NavigateToDashboard();
        cy.get(viewSiteLink).click();
        screenshot.takeScreenshot('ViewSiteLink');
        getIframeBody().find(sitePassword).type(baseData.sitePassword, { force: true });
        screenshot.takeScreenshot('SitePassword');
        getIframeBody().find(accessSiteButton).click();
        screenshot.takeScreenshot('AccessSiteButton');
        cy.wait(delay);
        getIframeBody().find(headerSite).should('exist');
    }
}

export const settingsPage = new SettingsPage();