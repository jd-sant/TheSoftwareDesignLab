var exec_date = Date.now()
module.exports = {
  env:{
        appName:"Ghost 4.5",
        delay:2000,
        adminName: "The Kraken",
        siteName: "Kraken Testing",
        adminEmail: "release-the-kraken@uniandes.edu.co",
        adminPass: "Kraken1234"
    },
  e2e: {
    // We've imported your old cypress plugins here.
    baseUrl:"http://localhost:3002",
    video: true,
    videoCompression: 15,
    videosFolder: './results_' + exec_date + '/videos',
    trashAssetsBeforeRuns: false,
    screenshotOnRunFailure: true, 
    pageLoadTimeout:20000,
    defaultCommandTimeout:20000,
    viewportWidth: 1000,
    viewportHeight: 660,
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
}