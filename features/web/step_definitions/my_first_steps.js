const { Given, When, Then } = require('@cucumber/cucumber');

Given('I waits for 1 seconds', function () {
    return this.driver.pause(5000);
});

