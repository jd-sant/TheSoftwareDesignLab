const { faker, fakerAR, fakerRU, fakerZH_CN, fakerJA, fakerHY } = require('@faker-js/faker');
const assert = require('assert');
const delay = 2000;
const postTitleInput = 'textarea[data-test-editor-title-input]';
const postContentInput = '[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p';
const postContentImageInput = '[data-secondary-instance="false"] > :nth-child(1) > :nth-child(1) > [contenteditable="true"][data-koenig-dnd-container="true"] > p[data-koenig-dnd-droppable="true"]';
const publishPostButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';
const confirmPublishButton = '[data-test-button="continue"]';
const finalPublishButton = '[data-test-button="confirm-publish"]';
const closeModalButton = 'button[data-test-button="close-publish-flow"]';
const dropdownPostFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPost = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPostTitle = '.gh-content-entry-title';
const imagePostFeatureClass = '.gh-editor-feature-image-unsplash'
const imageUnplashClass = '.gh-unsplash-photo-container > .gh-unsplash-photo-overlay > .gh-unsplash-photo-footer > .gh-unsplash-button';
const imageUnplashContentClass = '[data-kg-unsplash-insert-button="true"]';
const postAddCard = 'button[aria-label="Add a card"]';
const postUnplashCard = 'button[data-kg-card-menu-item="Unsplash"]';
const screenshot = require('./Screenshots');
class PostPage {

    postTitle = faker.book.title();
    postContent = faker.lorem.paragraphs(4,'\n');
    postTitleSpecial = faker.string.sample();
    postContentSpecial = faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample();
    postTitleMultilanguage = fakerHY.lorem.words(3) + fakerRU.lorem.words(3) + fakerZH_CN.lorem.words(3) + fakerJA.lorem.words(3) + fakerAR.lorem.words(3);
    postContentMultilanguage = fakerHY.lorem.paragraphs(2,'\n') + fakerRU.lorem.paragraphs(2,'\n') + fakerZH_CN.lorem.paragraphs(2,'\n') + fakerJA.lorem.paragraphs(2,'\n') + fakerAR.lorem.paragraphs(2,'\n');


    async ClearAndTypePost(context,postTitle_ = this.postTitle, postContent_ = this.postContent) {
        await context.driver.$(postTitleInput).click();
        await context.driver.$(postTitleInput).setValue(postTitle_);
        await screenshot.takeScreenshot(context,'FillPostTittle')
        await context.driver.$(postContentInput).click();
        await context.driver.$(postContentInput).setValue(postContent_);
        await screenshot.takeScreenshot(context,'FillPostContent')
        await context.driver.pause(delay);
    }

    async PublishPost(context){
        await context.driver.$(publishPostButton).click();
        await screenshot.takeScreenshot(context,'PublishPostClick-1', true);
        await context.driver.pause(delay);
        await context.driver.$(confirmPublishButton).click();
        await screenshot.takeScreenshot(context,'PublishPostClick-2', true);
        await context.driver.$(finalPublishButton).click();
        await context.driver.pause(3000);
        await context.driver.$(closeModalButton).click();
        await screenshot.takeScreenshot(context,'CloseModal');
        await context.driver.pause(delay);
    }

    async CreateAndPublishPost(context) {
        await this.ClearAndTypePost(context);
        await this.PublishPost(context);
    }

    async SeePostPublished(context, postTitle_ = this.postTitle) {
        await context.driver.$(dropdownPostFilter).click();
        await screenshot.takeScreenshot(context,'DropdownPostFilter');
        await context.driver.$(optionPublishedPost).click();
        await screenshot.takeScreenshot(context,'OptionPublishedPost');
        await context.driver.pause(delay);
        const postTitle = await context.driver.$(classPublisdPostTitle).getText();
        await screenshot.takeScreenshot(context,'SeePostPublished');
        return await assert.equal(postTitle,postTitle_);
    }

    async CreateAndPublishPostSpecial(context) {
        await this.ClearAndTypePost(context,this.postTitleSpecial,this.postContentSpecial);
        await this.PublishPost(context);
    }

    async SeeSpecialPostPublished(context) {
        await this.SeePostPublished(context,this.postTitleSpecial);
    }

    async ClearAndTypePostWithImages(context, postTitle_ = this.postTitle, postContent_ = this.postContent) {
        await context.driver.$(postTitleInput).click();
        await context.driver.$(postTitleInput).setValue(postTitle_);
        await screenshot.takeScreenshot(context,'FillPostTittleImage')
        await context.driver.pause(delay);
        await context.driver.$(postContentImageInput).click();
        await context.driver.$(postAddCard).click();
        await screenshot.takeScreenshot(context,'AddCard', true)
        await context.driver.$(postUnplashCard).click();
        await screenshot.takeScreenshot(context,'AddUnplashCard', true)
        await this.AddUnplashImage(context,imageUnplashContentClass);
        await context.driver.$(postContentImageInput).click();
        await context.driver.$(postContentImageInput).setValue(postContent_);
        await screenshot.takeScreenshot(context,'FillPostContentImage')
        await context.driver.pause(delay);
    }

    async AddUnplashImage(context, class_ = imageUnplashClass) {
        await context.driver.$(class_).click();
        await screenshot.takeScreenshot(context,'SelectUnplashImageClick', true);
        await context.driver.pause(delay);
    }

    async CreateAndPublishPostWithImages(context) {
        await context.driver.$(imagePostFeatureClass).click();
        await screenshot.takeScreenshot(context,'ClickImage', true);
        await context.driver.pause(delay);
        await this.AddUnplashImage(context);
        await this.ClearAndTypePostWithImages(context);
        await this.PublishPost(context);
    }

    async CreateAndPublishPostWithMultipleLanguages(context) {
        await this.ClearAndTypePost(context,this.postTitleMultilanguage,this.postContentMultilanguage);
        await this.PublishPost(context);
    }

    async SeeMultilanguagePostPublished(context) {
        await this.SeePostPublished(context,this.postTitleMultilanguage);
    }

    async CreateAndPublishPostWithTitleOnly(context) {
        await this.ClearAndTypePost(context,this.postTitle, ' ');
        await this.PublishPost(context);
    }
}

module.exports = new PostPage();