const delay = Cypress.env('delay') || 300;
const settingsButton = 'a[data-test-nav="settings"]';
const editSiteNameButton = '#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button';
const siteNameField = 'input[placeholder="Site title"]';
const siteDescriptionField = 'input[placeholder="Site description"]';
const saveButton = 'div[data-testid="title-and-description"] > div:nth-child(2) > div:nth-child(2)  > div:nth-child(1)  > button:nth-child(2)';

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
        cy.get(editSiteNameButton).click();
        this.takeScreenshot('EditSiteNameButton');
        cy.get(siteNameField).clear();
        cy.get(siteNameField).type('Kraken testing!!!');
        this.takeScreenshot('SiteNameField');
        cy.get(siteDescriptionField).clear();
        cy.get(siteDescriptionField).type('Site for the Flying Dutchman Crew!!!');
        this.takeScreenshot('SiteDescriptionField');
        cy.get(saveButton).click();
        cy.wait(delay);
        this.takeScreenshot('SaveButton');
    }
}

export const settingsPage = new SettingsPage();