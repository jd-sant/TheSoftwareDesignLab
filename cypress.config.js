var exec_date = Date.now()
module.exports = {
  env:{
        appName:"Ghost 5.96",
        delay:2000,
        adminName: "The Kraken",
        siteName: "Kraken Testing",
        adminEmail: "release-the-kraken@uniandes.edu.co",
        adminPass: "Kraken1234"
    },
  e2e: {
    // We've imported your old cypress plugins here.
    baseUrl:"http://localhost:3001",
    video: true,
    videoCompression: 15,
    videosFolder: './results_' + exec_date + '/videos',
    trashAssetsBeforeRuns: false,
    screenshotOnRunFailure: true, 
    screenshotsFolder: './cypress/screenshots/',
    pageLoadTimeout:20000,
    defaultCommandTimeout:20000,
    viewportWidth: 1200,
    viewportHeight: 900,
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
}