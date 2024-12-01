import { screenshot } from '../support/Screenshots';
import { dashboardPage } from './DashboardPage';

const delay = Cypress.env('delay') || 300;
const settingsButton = 'a[data-test-nav="settings"]';
const editSiteNameButton = '#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button';
const siteNameField = 'input[placeholder="Site title"]';
const siteDescriptionField = 'input[placeholder="Site description"]';
const saveButton = 'div[data-testid="title-and-description"] > div:nth-child(2) > div:nth-child(2)  > div:nth-child(1)  > button:nth-child(2)';
const cardSiteTimezone = 'div[data-testid="timezone"]'
const cardPublicationLanguaje = 'div[data-testid="publication-language"]';
const cardLabs = 'div[data-testid="labs"]';
const cardPortal = 'div[data-testid="portal"]';
const cardMetaData = 'div[data-testid="metadata"]';
const editButtonMetadata = `${cardMetaData} > div:nth-child(2) > div:nth-child(2) > div > button`;
const editButtonSiteTimezone = `${cardSiteTimezone} > div:nth-child(2) > div:nth-child(2) > div > button`;
const editButtonPublicationLanguaje = `${cardPublicationLanguaje} > div:nth-child(2) > div:nth-child(2) > div > button`;
const openButtonlabs = `${cardLabs} > div:nth-child(2) > button`;
const openButtonPortal = `${cardPortal} > div:nth-child(2) > div:nth-child(2) > button`;
const selectSiteTimezone = 'div[data-testid="timezone-select"]';
const listOptionsSiteTimezone = '.css-100ebu3-menu';
const buttonSaveSiteTimezon = '.cursor-pointer.bg-green';
const buttonExitSettings = 'button[data-testid="exit-settings"]';
const navigateToLabs = '#labs';
const navigateToPortal = '#portal';
const buttonTranslateAvaiable = '#:r77:';
const containerSiteTimezoneInput = '.css-b62m3t-container > .h-9';

const saveButtonPrivate = 'div[data-testid="locksite"] > div:nth-child(2) > div:nth-child(2)  > div:nth-child(1)  > button:nth-child(2)';
const privateButton = '[data-testid="locksite"] > .items-start > :nth-child(2) > .flex > .cursor-pointer > span';
const buttonEnablePrivate = 'button[data-state="unchecked"]';
const passwordInput = 'input[placeholder="Enter password"]';
const viewSiteLink = 'a[data-test-nav="site"]';
const sitePassword = 'input[class="gh-input"]';
const accessSiteButton = 'button[class="gh-btn"]';
const headerSite = 'header[id="gh-navigation"]';

const getIframeBody = () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
    .get('iframe[class="site-frame "]')
    .its('0.contentDocument.body').should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap)
  }

class SettingsPage {

    CanChangeSiteDescription(baseData) {
        cy.get(settingsButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('SettingsButton');
        cy.wait(delay);
        cy.get(editSiteNameButton).click();
        screenshot.takeScreenshot('EditSiteNameButton');
        cy.get(siteNameField).clear();
        cy.get(siteNameField).type(baseData.siteNameField, { force: true });
        screenshot.takeScreenshot('SiteNameField');
        cy.get(siteDescriptionField).clear();
        cy.get(siteDescriptionField).type(baseData.siteDescriptionField, { force: true });
        screenshot.takeScreenshot('SiteDescriptionField');
        cy.get(saveButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('SaveButton');
    }

    changeSiteTimezone(baseData) {
        screenshot.takeScreenshot('BeforeChangeSiteTimezone');
        cy.get(editButtonSiteTimezone).click();
        screenshot.takeScreenshot('ClickEditSiteTimezone');
        cy.get(selectSiteTimezone).find('input').type(baseData.generalTimeZone);
        cy.wait(delay);
        screenshot.takeScreenshot('TypeSiteTimezone');
        cy.get(listOptionsSiteTimezone).first().click();
        cy.get(buttonSaveSiteTimezon).click();
        cy.wait(delay);
        screenshot.takeScreenshot('SaveSiteTimezone');
    }

    changePublicationLanguage() {
        screenshot.takeScreenshot('BeforePublicationLanguage');
        cy.get(editButtonPublicationLanguaje).click();
        cy.wait(delay);
        screenshot.takeScreenshot('EditPublicationLanguage');
        cy.get(cardPublicationLanguaje).find('input').clear().type('es');
        screenshot.takeScreenshot('TypePublicationLanguage');
        cy.get(buttonSaveSiteTimezon).click();
        screenshot.takeScreenshot('SavePublicationLanguage');
        cy.get(navigateToLabs).click();
        cy.wait(delay);
        screenshot.takeScreenshot('NavigateToLabsPublicationLanguage');
        cy.get(openButtonlabs).click();
        cy.contains('span', 'Portal translation')
            .parents('.group\\/list-item')
            .find('button')
            .click();
            screenshot.takeScreenshot('AfterPublicationLanguage');
        cy.wait(delay);
    }

    changeMetaData(baseData){
        screenshot.takeScreenshot('BeforeChangeMetaData');
        cy.get(editButtonMetadata).click();
        screenshot.takeScreenshot('ClickChangeMetaData');
        cy.wait(delay);
        cy.contains('label', 'Meta title').parent().find('input').clear().type(baseData.generalMetaDataTitle301);
        screenshot.takeScreenshot('TitleChangeMetaData');
        cy.wait(delay);
        cy.contains('label', 'Meta description').parent().find('input').clear().type(baseData.generalMetaDataDescription501);
        screenshot.takeScreenshot('DescriptionChangeMetaData');
        cy.wait(delay);
        cy.get(buttonSaveSiteTimezon).click();
        screenshot.takeScreenshot('AfterchangeMetaData');
    }

    seeChangeTimezone(baseData) {
        cy.get(buttonExitSettings).click();
        screenshot.takeScreenshot('ExitGeneralSettings');
        cy.get(settingsButton).click();
        screenshot.takeScreenshot('NavigateToGeneralSettings');
        cy.get(editButtonSiteTimezone).click();
        screenshot.takeScreenshot('SeeGeneralSettingsTimeZone');
        cy.get(containerSiteTimezoneInput).should('contain.text', baseData.generalTimeZone);
    }

    seeChangePublicationLanguage () {
        screenshot.takeScreenshot('BeforeGeneralSettingsPublicationLanguage');
        cy.get(navigateToPortal).click();
        cy.get(openButtonPortal).click();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterGeneralSettingsPublicationLanguage');
    }

    seeChangeMetaDataWithwithoutlastCharacter(baseData){
        screenshot.takeScreenshot('BeforeSeeChangeMetaDataWithwithoutlastCharacter');
        cy.get(editButtonMetadata).click();
        cy.wait(delay);
        cy.contains('label', 'Meta title').parent().find('input').invoke('val').should('eq', baseData.generalMetaDataTitle301.slice(0, -1));
        cy.contains('label', 'Meta description').parent().find('input').invoke('val').should('eq', baseData.generalMetaDataDescription501.slice(0, -1));
        cy.wait(delay);
        screenshot.takeScreenshot('AfterSeeChangeMetaDataWithwithoutlastCharacter');
    }

    PrivatizateSite(baseData){
        cy.get(settingsButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('SettingsButton');
        cy.wait(delay);
        cy.get(privateButton).click();
        screenshot.takeScreenshot('PrivateButton');
        cy.wait(delay);
        cy.get(buttonEnablePrivate).click();
        screenshot.takeScreenshot('ButtonEnablePrivate');
        cy.wait(delay);
        cy.get(passwordInput).type(baseData.sitePassword, { force: true });
        screenshot.takeScreenshot('PasswordInput');
        cy.wait(delay);
        cy.get(saveButtonPrivate).click(); 
        screenshot.takeScreenshot('SaveButtonPrivate');
    }

    AccessSiteWithPassword(baseData){
        dashboardPage.NavigateToDashboard();
        cy.get(viewSiteLink).click();
        screenshot.takeScreenshot('ViewSiteLink');
        getIframeBody().find(sitePassword).type(baseData.sitePassword, { force: true });
        screenshot.takeScreenshot('SitePassword');
        getIframeBody().find(accessSiteButton).click();
        screenshot.takeScreenshot('AccessSiteButton');
        cy.wait(delay);
        getIframeBody().find(headerSite).should('exist');
    }
}

export const settingsPage = new SettingsPage();