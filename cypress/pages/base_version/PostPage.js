import { faker } from '@faker-js/faker';
import { fakerHY as fakerArmenian } from '@faker-js/faker';
import { fakerRU as fakerRussian } from '@faker-js/faker';
import { fakerZH_CN as fakerChinese } from '@faker-js/faker';
import { fakerJA as fakerJapanese } from '@faker-js/faker';
import { fakerAR as fakerArabic } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
const postTitleInput = 'textarea[placeholder="Post Title"]';
const postContentInput = '.koenig-editor__editor';
const publishPostButton = 'main > section > header > section > div:nth-child(2) > div > div:nth-child(1) > span';
const confirmPublishButton = 'footer > button:nth-child(2)';
const closeModalButton = 'main > section > header > div > div:nth-child(1) > a';
const dropdownPostFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPost = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPostTitle = '.gh-content-entry-title';
import { screenshot } from '../Screenshots';

class PostPage {

    postTitle = faker.book.title();
    postContent = faker.lorem.paragraphs(4,'\n');
    postTitleSpecial = faker.string.sample();
    postContentSpecial = faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample();
    postTitleMultilanguage = fakerArmenian.lorem.words(3) + fakerRussian.lorem.words(3) + fakerChinese.lorem.words(3) + fakerJapanese.lorem.words(3) + fakerArabic.lorem.words(3);
    postContentMultilanguage = fakerArmenian.lorem.paragraphs(2,'\n') + fakerRussian.lorem.paragraphs(2,'\n') + fakerChinese.lorem.paragraphs(2,'\n') + fakerJapanese.lorem.paragraphs(2,'\n') + fakerArabic.lorem.paragraphs(2,'\n');

    PublishPost(){
        cy.get(publishPostButton).click()
        screenshot.takeScreenshot('PublishPostClick-1');
        cy.wait(2000)
        cy.get(confirmPublishButton).click();
        screenshot.takeScreenshot('PublishPostClick-2');
        cy.get(closeModalButton).click();
        screenshot.takeScreenshot('CloseModal');
        cy.wait(delay);
    }

    ClearAndTypePost(postTitle_ = this.postTitle, postContent_ = this.postContent) {
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(postTitle_);
        screenshot.takeScreenshot('FillPostTittle')
        cy.get(postContentInput).clear()
        cy.get(postContentInput).type(postContent_);
        screenshot.takeScreenshot('FillPostContent')
        cy.wait(delay);
    }

    CreateAndPublishPost(postTitle_ = this.postTitle, postContent_ = this.postContent) {
        this.ClearAndTypePost(postTitle_, postContent_);
        this.PublishPost();
    }

    SeePostPublished(postTitle_ = this.postTitle) {
        cy.get(dropdownPostFilter).click();
        screenshot.takeScreenshot('DropdownPostFilter');
        cy.get(optionPublishedPost).click()
        screenshot.takeScreenshot('OptionPublishedPost');
        cy.wait(delay);
        cy.get(classPublisdPostTitle).first().should('to.contain', postTitle_);
        screenshot.takeScreenshot('SeePostPublished');
        cy.wait(delay);
    }
}

export const postPage = new PostPage();