const delay = Cypress.env('delay') || 300;
const settingsButton = 'nav:nth-child(1) > section > div:nth-child(2) > div > div > div:nth-child(2) > a';
const generalSettingsButton = 'a[href="#/settings/general/"]';
const editSiteNameButton = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-header > button';
const siteNameField = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(1) > input';
const siteDescriptionField = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(2) > input';
const saveButton = 'main > section > div:nth-child(1) > header > section > button';
import { screenshot } from '../Screenshots';
class SettingsPage {

    CanChangeSiteDescription(){
        cy.get(settingsButton).click();
        screenshot.takeScreenshot('SettingsButton');
        cy.wait(delay);
        cy.get(generalSettingsButton).click();
        cy.get(editSiteNameButton).click();
        screenshot.takeScreenshot('EditSiteNameButton');
        cy.get(siteNameField).clear();
        cy.get(siteNameField).type('Kraken testing!!!', {force: true});
        screenshot.takeScreenshot('SiteNameField');
        cy.get(siteDescriptionField).clear();
        cy.get(siteDescriptionField).type('Site for the Flying Dutchman Crew!!!', {force: true});
        screenshot.takeScreenshot('SiteDescriptionField');
        cy.get(saveButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('SaveButton');
    }
}

export const settingsPage = new SettingsPage();