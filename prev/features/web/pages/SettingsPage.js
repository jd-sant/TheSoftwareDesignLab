const delay = 2000;
const settingsButton = 'nav:nth-child(1) > section > div:nth-child(2) > div > div > div:nth-child(2) > a';
const generalSettingsButton = 'a[href="#/settings/general/"]';
const editSiteNameButton = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-header > button';
const siteNameField = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(1) > input';
const siteDescriptionField = 'main > section > div:nth-child(2) > section > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(2) > input';
const saveButton = 'main > section > div:nth-child(1) > header > section > button';
const screenshot = require('./Screenshots');

class SettingsPage {

    async CanChangeSiteDescription(context) {
        await context.driver.$(settingsButton).click();
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context,'SettingsButton');
        await context.driver.$(generalSettingsButton).click();
        await context.driver.$(editSiteNameButton).click();
        await screenshot.takeScreenshot(context,'EditSiteNameButton');
        await context.driver.$(siteNameField).setValue('Kraken testing!!!');
        await screenshot.takeScreenshot(context,'SiteNameField');
        await context.driver.$(siteDescriptionField).setValue('Site for the Flying Dutchman Crew!!!');
        await screenshot.takeScreenshot(context,'SiteDescriptionField');
        await context.driver.$(saveButton).click();
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context,'SaveButton');
    }
}

module.exports = new SettingsPage();