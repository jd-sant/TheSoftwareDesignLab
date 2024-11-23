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
        screenshot.takeScreenshot('PublishPostClick-3', true);
        cy.wait(delay);
        cy.get(modalClass).should('be.visible');
        screenshot.takeScreenshot('PublishPostClick-4', true);
        cy.get(closeModalButton).click();
        screenshot.takeScreenshot('CloseModal');
        cy.wait(delay);
    }

    ClearAndTypePost(postTitle_, postContent_) {
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(postTitle_);
        screenshot.takeScreenshot('FillPostTittle')
        cy.get(postContentInput).clear()
        cy.get(postContentInput).type(postContent_);
        screenshot.takeScreenshot('FillPostContent')
        cy.wait(delay);
    }

    ClearAndTypePostWithImages(postTitle_, postContent_) {
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

    CreateAndPublishPost(postTitle_, postContent_ ) {
        this.ClearAndTypePost(postTitle_, postContent_);
        this.PublishPost();
    }
    
    CreateAndPublishPostSpecial(baseData){
        this.CreateAndPublishPost(baseData.postTitle_special, baseData.postContent_special);
    }

    SeePostPublished(postTitle_ = this.postTitle) {
        cy.get(dropdownPostFilter).click();
        screenshot.takeScreenshot('DropdownPostFilter');
        cy.get(optionPublishedPost).click()
        screenshot.takeScreenshot('OptionPublishedPost');
        cy.wait(delay);
        cy.get(classPublisdPostTitle).first().should('to.contain', postTitle_.trim());
        screenshot.takeScreenshot('SeePostPublished');
        cy.wait(delay);
    }

    SeeSpecialPostPublished(baseData) {
        this.SeePostPublished(baseData.postTitle_special);
    };

    SeeMultilanguagePostPublished(baseData) {
        this.SeePostPublished(baseData.postTitle_multilanguage);
    }

    CreateAndPublishPostWithImages(baseData){
        cy.get(imagePostFeatureClass).click();
        screenshot.takeScreenshot('ClickImage', true);
        cy.wait(delay);
        this.AddUnplashImage();
        this.ClearAndTypePostWithImages(baseData.postTitle, baseData.postContent);
        this.PublishPost();
    }

    CreateAndPublishPostWithMultipleLanguages(baseData){
        this.CreateAndPublishPost(baseData.postTitle_multilanguage, baseData.postContent_multilanguage);
    }

    CreateAndPublishPostWithTitleOnly(baseData){
        this.CreateAndPublishPost(baseData.postTitle, ' ');
    }
}

export const postPage = new PostPage();