const { faker } = require('@faker-js/faker');
const assert = require('assert');
const delay = 2000;
const pageTitleInput = 'textarea[data-test-editor-title-input]';
const pageContentInput = '[data-secondary-instance="false"] > .koenig-lexical    > [data-kg="editor"] > .kg-prose > p';
const publishPageButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';
const confirmPublishButton = '[data-test-button="continue"]';
const finalPublishButton = '[data-test-button="confirm-publish"]';
const modalClass = '.modal-content';
const closeModalButton = '[data-test-button="close-publish-flow"]';
const dropdownPageFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPage = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPageTitle = '.gh-content-entry-title';
const optionPublishedFeaturePage = '.ember-power-select-option[data-option-index="4"]';
const titlePublishErrorMessage = '.gh-alert-content';
const titleValidationError = 'p[data-test-confirm-error]';
const pageSideMenuButton = 'button[data-test-psm-trigger=""]';
const pageFeatureButton = 'label[data-ember-action]';

class PagePage {

    pageTitle = faker.book.title();
    pageContent = faker.lorem.paragraphs(2,'\n');
    pageTitleSpecial = faker.string.sample();
    pageContentSpecial = faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample();
    pageTitleInvalid = faker.lorem.words(100);
    pageContentInvalid = faker.lorem.paragraphs(2,'\n');

    async ClearAndTypePage(context, pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        await context.driver.$(pageTitleInput).click();
        await context.driver.$(pageTitleInput).setValue(pageTitle_);
        await context.driver.$(pageContentInput).click();
        await context.driver.$(pageContentInput).setValue(pageContent_);
        await context.driver.pause(delay);
    }
    
    async ClickPublishPage(context){
        await context.driver.$(publishPageButton).click();
        await context.driver.pause(delay);
    }

    async PublishPage(context){
        await context.driver.$(publishPageButton).click();
        await context.driver.pause(delay);
        await context.driver.$(confirmPublishButton).click();
        await context.driver.$(finalPublishButton).click();
        await context.driver.pause(3000);
        await context.driver.$(closeModalButton).click();
        await context.driver.pause(delay);
    }



    async CreateAndPublishPage(context, pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        await this.ClearAndTypePage(context, pageTitle_, pageContent_);
        await this.PublishPage(context);
    }

    async CreateAndPublishPageSpecial(context){
        await this.CreateAndPublishPage(context, this.pageTitleSpecial, this.pageContentSpecial);
    }

    async SeePagePublished(context, pageTitle_ = this.pageTitle) {
        await context.driver.$(dropdownPageFilter).click();
        await context.driver.$(optionPublishedPage).click()
        await context.driver.pause(delay);
        const pageTitle = await context.driver.$(classPublisdPageTitle).getText();
        return await assert.equal(pageTitle, pageTitle_);
    }

    async SeeSpecialPagePublished(context) {
        await context.driver.$(dropdownPageFilter).click();
        await context.driver.$(optionPublishedPage).click();
        await context.driver.pause(delay);
        const pageTitle = await context.driver.$(classPublisdPageTitle).getText();
        return await assert.equal(pageTitle,this.pageTitleSpecial);
    }

    async ClearAndTypePageInvalid(context, pageTitle_ = this.pageTitle, pageContent_ = this.pageContent, pageTitle__ = this.pageTitleInvalid) {
        await context.driver.$(pageTitleInput).click();
        await context.driver.$(pageTitleInput).setValue(pageTitle_);
        await context.driver.pause(delay);
        await context.driver.$(pageContentInput).click();
        await context.driver.$(pageContentInput).setValue(pageContent_);
        await context.driver.pause(delay);
        await context.driver.$(pageTitleInput).click();
        await context.driver.$(pageTitleInput).setValue(pageTitle__);
    }

    async CreatePageInvalidTitle(context){
        await this.ClearAndTypePageInvalid(context, this.pageTitle, this.pageContentInvalid, this.pageTitleInvalid);
        await this.ClickPublishPage(context);
    }

    async LongTitlePublishError(context){
        const errorMessage = await context.driver.$(titlePublishErrorMessage).getText();
        return await assert.equal(errorMessage.trim(), 'Validation failed: Title cannot be longer than 255 characters.')
    }

    async FeaturePage(context){
        await context.driver.$(pageSideMenuButton).click();
        await context.driver.pause(delay);
        await context.driver.$(pageFeatureButton).click();
        await context.driver.pause(delay);
        await context.driver.$(pageSideMenuButton).click();
    }

    async CreateAndPublishFeaturePage(context, pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        await this.ClearAndTypePage(context);
        await this.FeaturePage(context);
        await this.PublishPage(context);
    }

    async SeeFeaturePagePublished(context){
        await context.driver.$(dropdownPageFilter).click();
        await context.driver.$(optionPublishedFeaturePage).click()
        await context.driver.pause(delay);
        const pageTitle = await context.driver.$(classPublisdPageTitle).getText();
        return await assert.equal(pageTitle, this.pageTitle)
    }
}

module.exports = new PagePage();