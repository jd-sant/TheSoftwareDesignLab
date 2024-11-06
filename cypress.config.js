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
    screenshotOnRunFailure: true, 
    screenshotsFolder: './results_' + exec_date + '/screenshots',
    pageLoadTimeout:20000,
    defaultCommandTimeout:20000,
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
}