const { faker } = require('@faker-js/faker');
const assert = require('assert');
const delay = 2000;
const postTitleInput = 'textarea[data-test-editor-title-input]';
const postContentInput = '[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p';
const postContentImageInput = '[data-secondary-instance="false"] > :nth-child(1) > :nth-child(1) > [contenteditable="true"][data-koenig-dnd-container="true"] > p[data-koenig-dnd-droppable="true"]';
const publishPostButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';
const confirmPublishButton = '[data-test-button="continue"]';
const finalPublishButton = '[data-test-button="confirm-publish"]';
const modalClass = '.modal-content';
const closeModalButton = 'button[data-test-button="close-publish-flow"]';
const dropdownPostFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPost = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPostTitle = '.gh-content-entry-title';
const imagePostFeatureClass = '.gh-editor-feature-image-unsplash'
const imageUnplashClass = '.gh-unsplash-photo-container > .gh-unsplash-photo-overlay > .gh-unsplash-photo-footer > .gh-unsplash-button';
const imageUnplashContentClass = '[data-kg-unsplash-insert-button="true"]';
const postAddCard = 'button[aria-label="Add a card"]';
const postUnplashCard = 'button[data-kg-card-menu-item="Unsplash"]';

class PostPage {

    postTitle = faker.book.title();
    postContent = faker.lorem.paragraphs(4,'\n');

    async ClearAndTypePost(context,postTitle_ = this.postTitle, postContent_ = this.postContent) {
        await context.driver.$(postTitleInput).click();
        await context.driver.$(postTitleInput).setValue(postTitle_);
        await context.driver.$(postContentInput).click();
        await context.driver.$(postContentInput).setValue(postContent_);
        await context.driver.pause(delay);
    }

    async PublishPost(context){
        await context.driver.$(publishPostButton).click();
        await context.driver.pause(delay);
        await context.driver.$(confirmPublishButton).click();
        await context.driver.$(finalPublishButton).click();
        await context.driver.pause(3000);
        await context.driver.$(closeModalButton).click();
        await context.driver.pause(delay);
    }

    async CreateAndPublishPost(context) {
        await this.ClearAndTypePost(context);
        await this.PublishPost(context);
    }

    async SeePostPublished(context, postTitle_ = this.postTitle) {
        await context.driver.$(dropdownPostFilter).click();
        await context.driver.$(optionPublishedPost).click();
        await context.driver.pause(delay);
        const postTitle = await context.driver.$(classPublisdPostTitle).getText();
        return await assert.equal(postTitle,postTitle_);
    }

}

module.exports = new PostPage();