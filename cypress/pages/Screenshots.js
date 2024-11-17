class Screenshot {

    // Contador para los screenshots
    screenshotCounter = 0;
    currentTest = Cypress.currentTest?.title || 'unnamedTest'
    datetime = new Date().toISOString().replace(/:/g,".");

    /**
      * Toma un screenshot con un nombre único y ordenado.
      * @param {string} name - Nombre del screenshot.
      */
    takeScreenshot(name, disabledAnimations = false) {
        if (disabledAnimations){
            Cypress.Screenshot.defaults({
                disableTimersAndAnimations: false,
            });
        }
        const pathScreenShot = Cypress.currentTest.title
        if (pathScreenShot != this.currentTest){
            this.currentTest = Cypress.currentTest.title
            this.screenshotCounter = 0
            this.datetime = new Date().toISOString().replace(/:/g,".");
        }
        const formattedCounter = String(this.screenshotCounter).padStart(3, '0'); // Formatea el número con ceros iniciales
        const screenshotName = `${formattedCounter}_${name}`;
        cy.screenshot(`${pathScreenShot}/${screenshotName}`);
        this.screenshotCounter++; // Incrementa el contador
        
    }
}

export const screenshot = new Screenshot();