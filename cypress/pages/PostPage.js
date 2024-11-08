import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
const postTitleInput = 'textarea[data-test-editor-title-input]';
const postContentInput = '[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p';
const publishPostButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';
const confirmPublishButton = '.gh-publish-cta > .gh-btn > span';
const finalPublishButton = '#ember61 > span';
const modalClass = '.modal-content';
const closeModalButton = '[data-test-button="close-publish-flow"]';
const dropdownPostFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPost = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPostTitle = '.gh-content-entry-title';

class PostPage {

    postTitle = faker.lorem.words(3);
    postContent = faker.lorem.paragraphs(4,'\n');
    postTitleSpecial = faker.string.sample();
    postContentSpecial = faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample();

    CreateAndPublishPost(postTitle_ = this.postTitle, postContent_ = this.postContent) {
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(postTitle_);
        cy.get(postContentInput).clear()
        cy.get(postContentInput).type(postContent_);
        cy.wait(delay);
        cy.get(publishPostButton).click()
        cy.wait(2000)
        cy.get(confirmPublishButton).click();
        cy.get(finalPublishButton).click();
        cy.wait(delay);
        cy.get(modalClass).should('be.visible');
        cy.get(closeModalButton).click();
        cy.wait(delay);
    }
    
    CreateAndPublishPostSpecial(){
        this.CreateAndPublishPost(this.postTitleSpecial, this.postContentSpecial);
    }

    SeePostPublished(postTitle_ = this.postTitle) {
        cy.get(dropdownPostFilter).click();
        cy.get(optionPublishedPost).click()
        cy.wait(delay);
        cy.get(classPublisdPostTitle).first().should('to.contain', postTitle_);
        cy.wait(delay);
    }

    SeeSpecialPostPublished() {
        this.SeePostPublished(this.postTitleSpecial);
    };
}

export const postPage = new PostPage();