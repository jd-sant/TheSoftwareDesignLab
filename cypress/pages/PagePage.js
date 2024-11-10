import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
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
const titlePublishErrorMessage = 'span[data-test-task-button-state="failure"]';
const titleValidationError = 'p[data-test-confirm-error]';
const pageSideMenuButton = 'button[data-test-psm-trigger=""]';
const pageFeatureButton = 'label[data-ember-action]';


class PagePage {

    pageTitle = faker.lorem.words(3);
    pageContent = faker.lorem.paragraphs(2,'\n');
    pageTitleSpecial = faker.string.sample();
    pageContentSpecial = faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample();
    pageTitleInvalid = faker.lorem.words(100);
    pageContentInvalid = faker.lorem.paragraphs(2,'\n');

    PublishPage(){
        cy.get(publishPageButton).click();
        cy.wait(2000);
        cy.get(confirmPublishButton).click();
        cy.get(finalPublishButton).click();
        cy.wait(delay);
        cy.get(modalClass).should('be.visible');
        cy.get(closeModalButton).click();
        cy.wait(delay);
    }

    ClickPublishPage(){
        cy.get(publishPageButton).click();
        cy.wait(2000);
        cy.get(confirmPublishButton).click();
        cy.get(finalPublishButton).click();
    }

    ClearAndTypePage(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        cy.get(pageTitleInput).clear();
        cy.get(pageTitleInput).type(pageTitle_);
        cy.get(pageContentInput).clear();
        cy.get(pageContentInput).type(pageContent_);
        cy.wait(delay);
    }

    CreateAndPublishPage(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        this.ClearAndTypePage(pageTitle_, pageContent_);
        this.PublishPage();
    }

    CreateAndPublishPageSpecial(){
        this.CreateAndPublishPage(this.pageTitleSpecial, this.pageContentSpecial);
    }

    SeePagePublished(pageTitle_ = this.pageTitle) {
        cy.get(dropdownPageFilter).click();
        cy.get(optionPublishedPage).click()
        cy.wait(delay);
        cy.get(classPublisdPageTitle).first().should('to.contain', pageTitle_);
        cy.wait(delay);
    }

    SeeSpecialPagePublished() {
        this.SeePagePublished(this.pageTitleSpecial);
    }

    ClearAndTypePageInvalid(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent, pageTitle__ = this.pageTitleInvalid) {
        cy.get(pageTitleInput).clear();
        cy.get(pageTitleInput).type(pageTitle_);
        cy.get(pageContentInput).clear();
        cy.get(pageContentInput).type(pageContent_);
        cy.wait(delay);
        cy.get(pageTitleInput).clear();
        cy.get(pageTitleInput).type(pageTitle__);
    }

    CreatePageInvalidTitle(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent, pageTitle__ = this.pageTitleInvalid){
        this.ClearAndTypePageInvalid(pageTitle_, pageContent_, pageTitle__);
        this.ClickPublishPage();
    }

    LongTitlePublishError(){
        cy.get(titlePublishErrorMessage).should('be.visible');
        cy.get(titleValidationError).should('to.contain', 'Validation failed: Title cannot be longer than 255 characters.')
        cy.wait(delay);
    }

    FeaturePage(){
        cy.get(pageSideMenuButton).click();
        cy.wait(2000);
        cy.get(pageFeatureButton).click();
        cy.wait(2000);
        cy.get(pageSideMenuButton).click();
    }

    CreateAndPublishFeaturePage(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        this.ClearAndTypePage(pageTitle_, pageContent_);
        this.FeaturePage();
        this.PublishPage();
    }

    SeeFeaturePagePublished(pageTitle_ = this.pageTitle){
        cy.get(dropdownPageFilter).click();
        cy.get(optionPublishedFeaturePage).click()
        cy.wait(delay);
        cy.get(classPublisdPageTitle).first().should('to.contain', pageTitle_);
        cy.wait(delay);
    }
}

export const pagePage = new PagePage();