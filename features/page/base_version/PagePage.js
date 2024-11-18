const { faker } = require('@faker-js/faker');
const screenshot = require('../pages/Screenshots');

const assert = require('assert');
const delay = 2000;
const pageTitleInput = 'textarea[class="gh-editor-title ember-text-area gh-input ember-view"]';
const pageContentInput = 'div[class="koenig-editor__editor __mobiledoc-editor __has-no-content"]';
const publishPageButton = 'div[class="gh-publishmenu ember-view"]';
const confirmPublishButton = 'button[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]';
const closeModalButton = 'div[class="ml3 flex items-center"]';
const dropdownPageFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPage = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPageTitle = '.gh-content-entry-title';

class PagePage {

    pageTitle = faker.book.title();
    pageContent = faker.lorem.paragraphs(2,'\n');

    async ClearAndTypePage(context, pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        await screenshot.takeScreenshot(context, 'BeforeClearPageTitle')
        await context.driver.$(pageTitleInput).click();
        await screenshot.takeScreenshot(context, 'BeforeTypePageTitle')
        await context.driver.$(pageTitleInput).setValue(pageTitle_);
        await screenshot.takeScreenshot(context, 'AfterTypePageTitle')
        await context.driver.$(pageContentInput).click();
        await screenshot.takeScreenshot(context, 'BeforeTypePageContent')
        await context.driver.$(pageContentInput).setValue(pageContent_);
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context, 'AfterTypePageContent')
    }

    async PublishPage(context){
        await screenshot.takeScreenshot(context, 'BeforeClickingPublishPageButton')
        await context.driver.$(publishPageButton).click();
        await screenshot.takeScreenshot(context, 'BeforeClickingConfirmPublishPageButton')
        await context.driver.pause(delay);
        await context.driver.$(confirmPublishButton).click();
        await screenshot.takeScreenshot(context, 'AfterFinalPublishPage')
        await context.driver.pause(3000);
        await context.driver.$(closeModalButton).click();
        await screenshot.takeScreenshot(context, 'AfterCloseModalButton')
        await context.driver.pause(delay);
    }

    async CreateAndPublishPage(context, pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        await this.ClearAndTypePage(context, pageTitle_, pageContent_);
        await this.PublishPage(context);
    }

    async SeePagePublished(context, pageTitle_ = this.pageTitle) {
        await screenshot.takeScreenshot(context, 'BeforeClickDropdownFilter')
        await context.driver.$(dropdownPageFilter).click();
        await screenshot.takeScreenshot(context, 'AfterClickDropdownFilter')
        await context.driver.$(optionPublishedPage).click()
        await screenshot.takeScreenshot(context, 'AfterPublishedPageFilter')
        await context.driver.pause(delay);
        const pageTitle = await context.driver.$(classPublisdPageTitle).getText();
        await screenshot.takeScreenshot(context, 'ValidationPublishedPageFilter')
        return await assert.equal(pageTitle, pageTitle_);
        
    }

}

module.exports = new PagePage();