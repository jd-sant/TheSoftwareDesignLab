import { faker } from '@faker-js/faker';
import { fakerHY as fakerArmenian } from '@faker-js/faker';
import { fakerRU as fakerRussian } from '@faker-js/faker';
import { fakerZH_CN as fakerChinese } from '@faker-js/faker';
import { fakerJA as fakerJapanese } from '@faker-js/faker';
import { fakerAR as fakerArabic } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
const postTitleInput = 'textarea[data-test-editor-title-input]';
const postContentInput = '[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p';
const postContentImageInput = '[data-secondary-instance="false"] > :nth-child(1) > :nth-child(1) > [contenteditable="true"][data-koenig-dnd-container="true"] > p[data-koenig-dnd-droppable="true"]';
const publishPostButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';
const confirmPublishButton = '[data-test-button="continue"]';
const finalPublishButton = '[data-test-button="confirm-publish"]';
const modalClass = '.modal-content';
const closeModalButton = '[data-test-button="close-publish-flow"]';
const dropdownPostFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPost = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPostTitle = '.gh-content-entry-title';
const imagePostFeatureClass = '.gh-editor-feature-image-unsplash'
const imageUnplashClass = '.gh-unsplash-photo-container > .gh-unsplash-photo-overlay > .gh-unsplash-photo-footer > .gh-unsplash-button';
const imageUnplashContentClass = '[data-kg-unsplash-insert-button="true"]';
const postAddCard = 'button[aria-label="Add a card"]';
const postUnplashCard = 'button[data-kg-card-menu-item="Unsplash"]';
import { screenshot } from '../Screenshots';

class PostPage {

    postTitle = faker.book.title();
    postContent = faker.lorem.paragraphs(4,'\n');
    postTitleSpecial = faker.string.sample();
    postContentSpecial = faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample();
    postTitleMultilanguage = fakerArmenian.lorem.words(3) + fakerRussian.lorem.words(3) + fakerChinese.lorem.words(3) + fakerJapanese.lorem.words(3) + fakerArabic.lorem.words(3);
    postContentMultilanguage = fakerArmenian.lorem.paragraphs(2,'\n') + fakerRussian.lorem.paragraphs(2,'\n') + fakerChinese.lorem.paragraphs(2,'\n') + fakerJapanese.lorem.paragraphs(2,'\n') + fakerArabic.lorem.paragraphs(2,'\n');

    AddUnplashImage(class_ = imageUnplashClass){
        cy.wait(delay);
        cy.get(class_).then(($el) => {
            const randomIndex = Math.floor(Math.random() * $el.length);
            const randomImage = $el[randomIndex];
            screenshot.takeScreenshot('SelectUnplashImage', true);
            cy.wrap(randomImage).click({force: true});
            screenshot.takeScreenshot('SelectUnplashImageClick', true);
            cy.wait(delay);
        });
    }

    PublishPost(){
        cy.get(publishPostButton).click()
        screenshot.takeScreenshot('PublishPostClick-1', true);
        cy.wait(2000)
        cy.get(confirmPublishButton).click();
        screenshot.takeScreenshot('PublishPostClick-2', true);
        cy.get(finalPublishButton).click();
        // screenshot.takeScreenshot('PublishPostClick-3', true);
        cy.wait(delay);
        cy.get(modalClass).should('be.visible');
        // screenshot.takeScreenshot('PublishPostClick-4', true);
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

    ClearAndTypePostWithImages(postTitle_ = this.postTitle, postContent_ = this.postContent) {
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(postTitle_);
        screenshot.takeScreenshot('FillPostTittleImage')
        cy.get(postContentInput).clear()
        cy.get(postAddCard).click();
        screenshot.takeScreenshot('AddCard', true)
        cy.get(postUnplashCard).click();
        screenshot.takeScreenshot('AddUnplashCard', true)
        this.AddUnplashImage(imageUnplashContentClass);
        cy.get(postContentImageInput).clear();
        cy.get(postContentImageInput).type(postContent_);
        screenshot.takeScreenshot('FillPostContentImage')
        cy.wait(delay);
    }

    CreateAndPublishPost(postTitle_ = this.postTitle, postContent_ = this.postContent) {
        this.ClearAndTypePost(postTitle_, postContent_);
        this.PublishPost();
    }
    
    CreateAndPublishPostSpecial(){
        this.CreateAndPublishPost(this.postTitleSpecial, this.postContentSpecial);
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

    SeeSpecialPostPublished() {
        this.SeePostPublished(this.postTitleSpecial);
    };

    SeeMultilanguagePostPublished() {
        this.SeePostPublished(this.postTitleMultilanguage);
    }

    CreateAndPublishPostWithImages(postTitle_ = this.postTitle, postContent_ = this.postContent){
        cy.get(imagePostFeatureClass).click();
        screenshot.takeScreenshot('ClickImage', true);
        cy.wait(delay);
        this.AddUnplashImage();
        this.ClearAndTypePostWithImages(postTitle_, postContent_);
        this.PublishPost();
    }

    CreateAndPublishPostWithMultipleLanguages(){
        this.CreateAndPublishPost(this.postTitleMultilanguage, this.postContentMultilanguage);
    }

    CreateAndPublishPostWithTitleOnly(){
        this.CreateAndPublishPost(this.postTitle, ' ');
    }
}

export const postPage = new PostPage();