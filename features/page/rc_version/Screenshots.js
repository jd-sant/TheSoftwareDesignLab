const { getCurrentScenarioName } = require('../support/hooks');
const fs = require('fs');
const path = require('path');

class Screenshot {
     // Contador para los screenshots
     screenshotCounter = 0;
     // Escenario actual
     currentScenario = ''
     // Fecha al momento de ejecutar
     datetime = new Date().toISOString().replace(/:/g,".");
     
    /**
      * Toma un screenshot con un nombre único y ordenado.
      * @param {string} name - Nombre del screenshot.
      */
    async takeScreenshot(context, name) {
        const scenarioName = getCurrentScenarioName();
        if (scenarioName != this.currentScenario){
            this.currentScenario = scenarioName
            this.screenshotCounter = 0
            this.datetime = new Date().toISOString().replace(/:/g,".");
        }
        const formattedCounter = String(this.screenshotCounter).padStart(3, '0'); // Formatea el número con ceros iniciales
        const screenshotName = `${formattedCounter}_${name}.png`;

        const screenshotPath = path.join(
            'features/',
            'screenshots',
            'rc_version',
            `${scenarioName}`,
            screenshotName
        );

        fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });

        const screenshotData = await context.driver.takeScreenshot();
        fs.writeFileSync(screenshotPath, screenshotData, 'base64');

        this.screenshotCounter++; // Incrementa el contador
        
    }
}

module.exports = new Screenshot();