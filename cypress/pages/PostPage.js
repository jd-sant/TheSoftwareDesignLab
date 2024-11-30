const delay = Cypress.env('delay') || 300;
const url = Cypress.config('baseUrl') || 'http://localhost:3001';
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
const titlePublishErrorMessage = 'span[data-test-task-button-state="failure"]';
const titleValidationError = 'p[data-test-confirm-error]';
const pageSideMenuButton = 'button[data-test-psm-trigger=""]';
const postUrlField = '.post-setting-slug';
const publishedPost = 'a[class="ember-view permalink gh-list-data gh-post-list-title"]';
const updatePostButton = 'button[data-test-button="publish-save"]';
import { screenshot } from '../support/Screenshots';
import { dashboardPage } from './DashboardPage';

class PostPage {

    AddUnplashImage(class_ = imageUnplashClass) {
        cy.wait(delay);
        cy.get(class_).then(($el) => {
            const randomIndex = Math.floor(Math.random() * $el.length);
            const randomImage = $el[randomIndex];
            screenshot.takeScreenshot('SelectUnplashImage', true);
            cy.wrap(randomImage).click({ force: true });
            screenshot.takeScreenshot('SelectUnplashImageClick', true);
            cy.wait(delay);
        });
    }

    PublishPost() {
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
        cy.get(postTitleInput).type(postTitle_, { force: true });
        screenshot.takeScreenshot('FillPostTittle')
        cy.get(postContentInput).clear()
        cy.get(postContentInput).type(postContent_, { force: true });
        screenshot.takeScreenshot('FillPostContent')
        cy.wait(delay);
    }

    ClearAndTypeLongPost(postTitle_, postContent_) {
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(' ', { force: true });
        cy.get(postContentInput).clear()
        cy.get(postContentInput).type(postContent_, { force: true });
        screenshot.takeScreenshot('FillPostContent')
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(postTitle_, { force: true });
        screenshot.takeScreenshot('FillPostTittle')
        cy.wait(delay);
    }

    ClearAndTypePostWithImages(postTitle_, postContent_) {
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(postTitle_, { force: true });
        screenshot.takeScreenshot('FillPostTittleImage')
        cy.get(postContentInput).clear()
        cy.get(postAddCard).click();
        screenshot.takeScreenshot('AddCard', true)
        cy.get(postUnplashCard).click();
        screenshot.takeScreenshot('AddUnplashCard', true)
        this.AddUnplashImage(imageUnplashContentClass);
        cy.get(postContentImageInput).clear();
        cy.get(postContentImageInput).type(postContent_, { force: true });
        screenshot.takeScreenshot('FillPostContentImage')
        cy.wait(delay);
    }

    CreateAndPublishPost(postTitle_, postContent_) {
        this.ClearAndTypePost(postTitle_, postContent_);
        this.PublishPost();
    }

    CreateAndPublishPostSpecial(baseData) {
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

    CreateAndPublishPostWithImages(baseData) {
        cy.get(imagePostFeatureClass).click();
        screenshot.takeScreenshot('ClickImage', true);
        cy.wait(delay);
        this.AddUnplashImage();
        this.ClearAndTypePostWithImages(baseData.postTitle, baseData.postContent);
        this.PublishPost();
    }

    CreateAndPublishPostWithMultipleLanguages(baseData) {
        this.CreateAndPublishPost(baseData.postTitle_multilanguage, baseData.postContent_multilanguage);
    }

    CreateAndPublishPostWithTitleOnly(baseData) {
        this.CreateAndPublishPost(baseData.postTitle, ' ');
    }

    CreateAndPublishPostWithEmojis(baseData) {
        this.ClearAndTypePost(baseData.postTitle_emojis, baseData.postContent);
    }

    PublishButtonUnavailable() {
        cy.get(publishPostButton).should('not.exist');
        screenshot.takeScreenshot('PublishButtonUnavailable');
    }

    CreateAndPublishPostWithSymbols(baseData) {
        this.ClearAndTypePost(baseData.postTitle_symbols, baseData.postContent);
    }

    CreateAndPublishLongTitlePost(baseData) {
        this.ClearAndTypeLongPost(baseData.postTitle_256, baseData.postContent);
        this.ClickPublishPage();
    }

    ClickPublishPage() {
        screenshot.takeScreenshot('BeforeClickingPublishPageButton')
        cy.get(publishPostButton).click();
        screenshot.takeScreenshot('BeforeClickingConfirmPublishPageButton')
        cy.wait(2000);
        cy.get(confirmPublishButton).click();
        screenshot.takeScreenshot('BeforeFinalPublishPage')
        cy.get(finalPublishButton).click();
        cy.wait(2000);
        screenshot.takeScreenshot('AfterFinalPublishPage')
    }

    PostLongTitlePublishError() {
        screenshot.takeScreenshot('BeforeTitlePublishErrorMessage')
        cy.get(titlePublishErrorMessage).should('be.visible');
        screenshot.takeScreenshot('AfterTitlePublishErrorMessage')
        cy.get(titleValidationError).should('to.contain', 'Validation failed: Title cannot be longer than 255 characters.')
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationTitlePublishErrorMessage')
    }

    ChangePostURL(postURL_) {
        screenshot.takeScreenshot('BeforeClickSideMenuButton')
        cy.get(pageSideMenuButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterClickSideMenuButton')
        cy.get(postUrlField).clear();
        cy.get(postUrlField).type(postURL_, { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('AfterChangePostURL')
        cy.get(pageSideMenuButton).click();
        screenshot.takeScreenshot('AfterCloseSideMenuButton')
    }

    CreateAndPublishPostURL(baseData) {
        this.ClearAndTypePost(baseData.postTitle, baseData.postContent);
        this.ChangePostURL(baseData.postURL);
        this.PublishPost();
    }

    SeePostPublishedURL(baseData) {
        cy.visit(url + '/' + baseData.postURL);
        cy.wait(delay);
        screenshot.takeScreenshot('NavigateToThePost');
        cy.contains(baseData.postTitle);
    }

    CreateEmptyPost(baseData) {
        this.ClearAndTypePost(baseData.postTitle, baseData.postContent);
        cy.get(postTitleInput).clear();
        screenshot.takeScreenshot('DeletePostTitle')
        cy.wait(delay);
        cy.get(postContentInput).clear()
        screenshot.takeScreenshot('DeletePostContent')
        cy.wait(delay);
    }

    CantPublishExistingPost(baseData) {
        dashboardPage.NavigateToPostPage();
        this.ClearAndTypePost(baseData.postTitle, baseData.postContent);
        this.ClickPublishPage();
        this.PublishDupFail();
    }

    PublishDupFail() {
        screenshot.takeScreenshot('BeforeTitlePublishErrorMessage')
        cy.get(titlePublishErrorMessage).should('be.visible');
        screenshot.takeScreenshot('AfterTitlePublishErrorMessage')
        cy.get(titleValidationError).should('to.contain', 'Validation failed: Post already exists')
        cy.wait(delay);
    }

    UpdatePostPublishedDate() {
        dashboardPage.NavigateToDashboard();
        cy.visit(url + '/ghost/#/posts');
        cy.wait(delay);
        cy.get(dropdownPostFilter).click();
        screenshot.takeScreenshot('DropdownPostFilter');
        cy.get(optionPublishedPost).click()
        screenshot.takeScreenshot('OptionPublishedPost');
        cy.wait(delay);
        cy.get(publishedPost).then(($el) => {
            const randomIndex = Math.floor(Math.random() * $el.length);
            const randomPost = $el[randomIndex];
            cy.wrap(randomPost).click({ force: true });
            screenshot.takeScreenshot('SelectRandomPublishedPost', true);
            cy.wait(delay);
        });
        screenshot.takeScreenshot('BeforeClickSideMenuButton')
        cy.get(pageSideMenuButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterClickSideMenuButton')
        cy.get('.gh-date-time-picker-date ').clear();
        cy.get('.gh-date-time-picker-date ').type('2021-01-01');
        cy.wait(delay);
    }

    UpdatedButtonEnable() {
        screenshot.takeScreenshot('UpdatingPost');
        cy.get(updatePostButton).should('not.be.disabled');
    }
}

export const postPage = new PostPage();