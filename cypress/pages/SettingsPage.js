const delay = Cypress.env('delay') || 300;
const settingsButton = 'a[data-test-nav="settings"]';
const editSiteNameButton = '#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button';
const siteNameField = 'input[placeholder="Site title"]';
const siteDescriptionField = 'input[placeholder="Site description"]';
const saveButton = 'div[data-testid="title-and-description"] > div:nth-child(2) > div:nth-child(2)  > div:nth-child(1)  > button:nth-child(2)';

class SettingsPage {

    CanChangeSiteDescription(){
        cy.get(settingsButton).click();
        cy.wait(delay);
        cy.get(editSiteNameButton).click();
        cy.get(siteNameField).clear();
        cy.get(siteNameField).type('Kraken testing!!!');
        cy.get(siteDescriptionField).clear();
        cy.get(siteDescriptionField).type('Site for the Flying Dutchman Crew!!!');
        cy.get(saveButton).click();
        cy.wait(delay);
    }
}

export const settingsPage = new SettingsPage();