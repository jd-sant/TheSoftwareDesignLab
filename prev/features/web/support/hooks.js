const { After, Before } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');

let currentScenarioName = '';

Before(async function(scenario) {
  currentScenarioName = scenario.pickle.name; // Obtén el nombre del escenario
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
})

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

module.exports = {
  getCurrentScenarioName: () => currentScenarioName, // Exporta para usarlo en otras partes
};