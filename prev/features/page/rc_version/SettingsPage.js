const delay = 2000;
const settingsButton = 'a[data-test-nav="settings"]';
const editSiteNameButton = '#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button';
const siteNameField = 'input[placeholder="Site title"]';
const siteDescriptionField = 'input[placeholder="Site description"]';
const saveButton = 'div[data-testid="title-and-description"] > div:nth-child(2) > div:nth-child(2)  > div:nth-child(1)  > button:nth-child(2)';
const screenshot = require('./Screenshots');

class SettingsPage {

    async CanChangeSiteDescription(context) {
        await context.driver.$(settingsButton).click();
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context,'SettingsButton');
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