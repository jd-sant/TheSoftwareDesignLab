const delay = Cypress.env('delay') || 300;
const settingsButton = 'nav:nth-child(1) > section > div:nth-child(2) > div > div > div:nth-child(2) > a';
const generalSettingsButton = 'a[href="#/settings/general/"]';
const editSiteNameButton = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-header > button';
const siteNameField = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(1) > input';
const siteDescriptionField = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(2) > input';
const saveButton = 'main > section > div:nth-child(1) > header > section > button';

class SettingsPage {

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

    CanChangeSiteDescription(){
        cy.get(settingsButton).click();
        this.takeScreenshot('SettingsButton');
        cy.wait(delay);
        cy.get(generalSettingsButton).click();
        cy.get(editSiteNameButton).click();
        this.takeScreenshot('EditSiteNameButton');
        cy.get(siteNameField).clear();
        cy.get(siteNameField).type('Kraken testing!!!', {force: true});
        this.takeScreenshot('SiteNameField');
        cy.get(siteDescriptionField).clear();
        cy.get(siteDescriptionField).type('Site for the Flying Dutchman Crew!!!', {force: true});
        this.takeScreenshot('SiteDescriptionField');
        cy.get(saveButton).click();
        cy.wait(delay);
        this.takeScreenshot('SaveButton');
    }
}

export const settingsPage = new SettingsPage();