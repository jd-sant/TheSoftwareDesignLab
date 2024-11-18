import { faker } from '@faker-js/faker';
import { screenshot } from '../Screenshots';
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
        screenshot.takeScreenshot('BeforeClickingPublishPageButton')
        cy.get(publishPageButton).click();
        screenshot.takeScreenshot('BeforeClickingConfirmPublishPageButton')
        cy.wait(2000);
        cy.get(confirmPublishButton).click();
        cy.get(finalPublishButton).click();
        cy.wait(delay);
        cy.get(modalClass).should('be.visible');
        screenshot.takeScreenshot('AfterFinalPublishPage')
        cy.get(closeModalButton).click();
        screenshot.takeScreenshot('AfterCloseModalButton')
        cy.wait(delay);
    }

    ClickPublishPage(){
        screenshot.takeScreenshot('BeforeClickingPublishPageButton')
        cy.get(publishPageButton).click();
        screenshot.takeScreenshot('BeforeClickingConfirmPublishPageButton')
        cy.wait(2000);
        cy.get(confirmPublishButton).click();
        screenshot.takeScreenshot('BeforeFinalPublishPage')
        cy.get(finalPublishButton).click();
        cy.wait(2000);
        screenshot.takeScreenshot('AfterFinalPublishPage')
    }

    ClearAndTypePage(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        screenshot.takeScreenshot('BeforeClearPageTitle')
        cy.get(pageTitleInput).clear();
        screenshot.takeScreenshot('BeforeTypePageTitle')
        cy.get(pageTitleInput).type(pageTitle_);
        screenshot.takeScreenshot('AfterTypePageTitle')
        cy.get(pageContentInput).clear();
        screenshot.takeScreenshot('BeforeTypePageContent')
        cy.get(pageContentInput).type(pageContent_);
        cy.wait(delay);
        screenshot.takeScreenshot('AfterTypePageContent')
    }

    CreateAndPublishPage(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        this.ClearAndTypePage(pageTitle_, pageContent_);
        this.PublishPage();
    }

    CreateAndPublishPageSpecial(){
        this.CreateAndPublishPage(this.pageTitleSpecial, this.pageContentSpecial);
    }

    SeePagePublished(pageTitle_ = this.pageTitle) {
        screenshot.takeScreenshot('BeforeClickDropdownFilter')
        cy.get(dropdownPageFilter).click();
        screenshot.takeScreenshot('AfterClickDropdownFilter')
        cy.get(optionPublishedPage).click()
        screenshot.takeScreenshot('AfterPublishedPageFilter')
        cy.wait(delay);
        cy.get(classPublisdPageTitle).first().should('to.contain', pageTitle_);
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationPublishedPageFilter')
    }

    SeeSpecialPagePublished() {
        this.SeePagePublished(this.pageTitleSpecial);
    }

    ClearAndTypePageInvalid(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent, pageTitle__ = this.pageTitleInvalid) {
        screenshot.takeScreenshot('BeforeClearPageTitleInvalid')
        cy.get(pageTitleInput).clear();
        screenshot.takeScreenshot('BeforeTypePageTitleNormal')
        cy.get(pageTitleInput).type(pageTitle_);
        screenshot.takeScreenshot('AfterTypePageTitleNormal')
        cy.get(pageContentInput).clear();
        screenshot.takeScreenshot('BeforeTypePageContentInvalid')
        cy.get(pageContentInput).type(pageContent_);
        cy.wait(delay);
        screenshot.takeScreenshot('AfterTypePageContent')
        cy.get(pageTitleInput).clear();
        screenshot.takeScreenshot('BeforeTypePageTitleInvalid')
        cy.get(pageTitleInput).type(pageTitle__);
        screenshot.takeScreenshot('AfterTypePageTitleInvalid')
    }

    CreatePageInvalidTitle(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent, pageTitle__ = this.pageTitleInvalid){
        this.ClearAndTypePageInvalid(pageTitle_, pageContent_, pageTitle__);
        this.ClickPublishPage();
    }

    LongTitlePublishError(){
        screenshot.takeScreenshot('BeforeTitlePublishErrorMessage')
        cy.get(titlePublishErrorMessage).should('be.visible');
        screenshot.takeScreenshot('AfterTitlePublishErrorMessage')
        cy.get(titleValidationError).should('to.contain', 'Validation failed: Title cannot be longer than 255 characters.')
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationTitlePublishErrorMessage')
    }

    FeaturePage(){
        screenshot.takeScreenshot('BeforeClickSideMenuButton')
        cy.get(pageSideMenuButton).click();
        cy.wait(2000);
        screenshot.takeScreenshot('AfterClickSideMenuButton')
        cy.get(pageFeatureButton).click();
        cy.wait(2000);
        screenshot.takeScreenshot('AfterClickFeatureButton')
        cy.get(pageSideMenuButton).click();
        screenshot.takeScreenshot('AfterCloseSideMenuButton')
    }

    CreateAndPublishFeaturePage(pageTitle_ = this.pageTitle, pageContent_ = this.pageContent) {
        this.ClearAndTypePage(pageTitle_, pageContent_);
        this.FeaturePage();
        this.PublishPage();
    }

    SeeFeaturePagePublished(pageTitle_ = this.pageTitle){
        screenshot.takeScreenshot('BeforeClickDropdownFilter')
        cy.get(dropdownPageFilter).click();
        screenshot.takeScreenshot('AfterClickDropdownFilter')
        cy.get(optionPublishedFeaturePage).click()
        screenshot.takeScreenshot('AfterFeaturePageFilter')
        cy.wait(delay);
        cy.get(classPublisdPageTitle).first().should('to.contain', pageTitle_);
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationFeaturePageFilter')
    }
}

export const pagePage = new PagePage();