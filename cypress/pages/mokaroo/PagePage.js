const delay = Cypress.env('delay') || 300;
const url = Cypress.config('baseUrl') || 'http://localhost:3001';
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
const excerptValidationError = 'div[class="gh-alert-content"]'
const pageSideMenuButton = 'button[data-test-psm-trigger=""]';
const pageUrlField = '.post-setting-slug';
const pageFeatureButton = 'label[data-ember-action]';
const pageAreaExcerpt = 'textarea[class="post-setting-custom-excerpt ember-text-area gh-input ember-view"]';
import { screenshot } from '../Screenshots';


class PagePage {

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
    }

    ClearAndTypePage(pageTitle_, pageContent_) {
        screenshot.takeScreenshot('BeforeClearPageTitle')
        cy.get(pageTitleInput).clear();
        screenshot.takeScreenshot('BeforeTypePageTitle')
        cy.get(pageTitleInput).type(pageTitle_,{ force: true });
        screenshot.takeScreenshot('AfterTypePageTitle')
        cy.get(pageContentInput).clear();
        screenshot.takeScreenshot('BeforeTypePageContent')
        cy.get(pageContentInput).type(pageContent_,{ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('AfterTypePageContent')
    }

    ClearAndTypeLongPage(pageTitle_, pageContent_) {
        cy.get(pageTitleInput).clear();
        cy.get(pageTitleInput).type(' ',{ force: true });
        cy.get(pageContentInput).clear()
        cy.get(pageContentInput).type(pageContent_,{ force: true });
        screenshot.takeScreenshot('FillPageContent')
        cy.get(pageTitleInput).clear();
        cy.get(pageTitleInput).type(pageTitle_,{ force: true });
        screenshot.takeScreenshot('FillPageTittle')
        cy.wait(delay);
    }

    CreateAndPublishPage(pageTitle_, pageContent_) {
        this.ClearAndTypePage(pageTitle_, pageContent_);
        this.PublishPage();
    }

    CreateAndPublishPageSpecial(baseData){
        this.CreateAndPublishPage(baseData.pageTitle_Special, baseData.pageContent_Special);
    }

    SeePagePublished(pageTitle_ = this.pageTitle) {
        screenshot.takeScreenshot('BeforeClickDropdownFilter')
        cy.get(dropdownPageFilter).click();
        screenshot.takeScreenshot('AfterClickDropdownFilter')
        cy.get(optionPublishedPage).click()
        screenshot.takeScreenshot('AfterPublishedPageFilter')
        cy.wait(delay);
        cy.get(classPublisdPageTitle).first().should('to.contain', pageTitle_.trim());
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationPublishedPageFilter')
    }

    SeeSpecialPagePublished(baseData) {
        this.SeePagePublished(baseData.pageTitle_Special);
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

    CreateAndPublishPageWithTitleOnly(baseData){
        this.CreateAndPublishPage(baseData.pageTitle, ' ');
    }

    CreateAndPublishPageWithMultipleLanguages(baseData){
        this.CreateAndPublishPage(baseData.pageTitle_multilanguage, baseData.pageContent_multilanguage);
    }

    SeeMultilanguagePagePublished(baseData) {
        this.SeePagePublished(baseData.pageTitle_multilanguage);
    }

    CreateAndPublishPageWithEmojis(baseData){
        this.ClearAndTypePage(baseData.pageTitle_Emojis, baseData.pageContent);
    }

    PublishButtonUnavailable(){
        cy.get(publishPageButton).should('not.exist');
        screenshot.takeScreenshot('PublishButtonUnavailable');
    }

    CreateAndPublishPageWithSymbols(baseData){
        this.ClearAndTypePage(baseData.pageTitle_Symbols, baseData.pageContent);
    }

    CreateAndPublishPageWithContentOnly(baseData){
        this.CreateAndPublishPage(' ', baseData.pageContent);
    }

    CreateAndPublishLongTitlePage(baseData){
        this.ClearAndTypeLongPage(baseData.pageTitle_256, baseData.pageContent);
        this.ClickPublishPage();
    }

    PageLongTitlePublishError(){
        screenshot.takeScreenshot('BeforeTitlePublishErrorMessage')
        cy.get(titlePublishErrorMessage).should('be.visible');
        screenshot.takeScreenshot('AfterTitlePublishErrorMessage')
        cy.get(titleValidationError).should('to.contain', 'Validation failed: Title cannot be longer than 255 characters.')
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationTitlePublishErrorMessage')
    }

    ChangePageURL(pageURL_){
        screenshot.takeScreenshot('BeforeClickSideMenuButton')
        cy.get(pageSideMenuButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterClickSideMenuButton')
        cy.get(pageUrlField).clear();
        cy.get(pageUrlField).type(pageURL_, {force: true});
        cy.wait(delay);
        screenshot.takeScreenshot('AfterChangePostURL')
        cy.get(pageSideMenuButton).click();
        screenshot.takeScreenshot('AfterCloseSideMenuButton')
    }

    CreateAndPublishPageURL(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.ChangePageURL(baseData.pageURL);
        this.PublishPage();
    }

    SeePagePublishedURL(baseData){
        cy.visit(url + '/' + baseData.pageURL);
        cy.wait(delay);
        screenshot.takeScreenshot('NavigateToThePage');
        cy.contains(baseData.pageTitle);
    }

    AddPageExcerpt(pageExcerpt_){
        screenshot.takeScreenshot('BeforeClickSideMenuButton')
        cy.get(pageSideMenuButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterClickSideMenuButton')
        cy.get(pageAreaExcerpt).clear();
        cy.get(pageAreaExcerpt).type(pageExcerpt_, {force: true});
        cy.wait(delay);
        screenshot.takeScreenshot('AfterChangePostURL')
        cy.get(pageSideMenuButton).click();
        screenshot.takeScreenshot('AfterCloseSideMenuButton')
    }

    CreateAndPublishPageExcerpt(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.AddPageExcerpt(baseData.pageExcerpt);
        this.ClickPublishPage()
    }

    PageLongExcerptPublishError(){
        screenshot.takeScreenshot('BeforeTitlePublishErrorMessage')
        cy.get(excerptValidationError).should('be.visible');
        screenshot.takeScreenshot('AfterTitlePublishErrorMessage')
        cy.wait(delay);
    }

}

export const pagePage = new PagePage();