const { faker, fakerAR, fakerRU, fakerZH_CN, fakerJA, fakerHY } = require('@faker-js/faker');
const assert = require('assert');
const delay = 2000;
const postTitleInput = 'textarea[placeholder="Post Title"]';
const postContentInput = '.koenig-editor__editor';
const publishPostButton = 'main > section > header > section > div:nth-child(2) > div > div:nth-child(1) > span';
const confirmPublishButton = 'footer > button:nth-child(2)';
const closeModalButton = 'main > section > header > div > div:nth-child(1) > a';
const dropdownPostFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPost = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPostTitle = '.gh-content-entry-title';
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

}

module.exports = new PostPage();