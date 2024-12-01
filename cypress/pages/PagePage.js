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
const dropdownDateFilter = 'div[class="gh-contentfilter-menu gh-contentfilter-sort"]'
const optionPublishedPage = '.ember-power-select-option[data-option-index="2"]';
const optionOldestPage = '.ember-power-select-option[data-option-index="2"]'
const classPublisdPageTitle = '.gh-content-entry-title';
const titlePublishErrorMessage = 'span[data-test-task-button-state="failure"]';
const titleValidationError = 'p[data-test-confirm-error]';
const excerptValidationError = 'div[class="gh-alert-content"]'
const pageSideMenuButton = 'button[data-test-psm-trigger=""]';
const pageUrlField = '.post-setting-slug';
const pageAreaExcerpt = 'textarea[class="post-setting-custom-excerpt ember-text-area gh-input ember-view"]';
const editbutton = 'span[class="gh-post-list-cta edit "]';
const updatebutton = 'button[class="gh-btn gh-btn-editor gh-editor-save-trigger green ember-view"]'
const titleupdateerrormessage = 'div[class="gh-alert-content"]'
import { screenshot } from '../support/Screenshots';
const PageBackMenu = 'a[class="ember-view gh-btn-editor gh-editor-back-button"]'
const idNavigateCreatePage = 'a[data-test-new-page-button]';
const pageDateField = 'input[data-test-date-time-picker-date-input]';
const updateButtonStatus = 'button[class="gh-btn gh-btn-editor gh-editor-save-trigger green ember-view"]'


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
        cy.get(confirmPublishButton).click();
        screenshot.takeScreenshot('BeforeFinalPublishPage')
        cy.get(finalPublishButton).click();
        cy.wait(2000);
        screenshot.takeScreenshot('AfterFinalPublishPage')
    }
    
    ClickPublishPageValidation(){
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

    ClearAndTypeLongPageUpdate(pageTitle_, pageContent_) {
        cy.get(pageTitleInput).clear();
        cy.get(pageTitleInput).type(' ',{ force: true });
        cy.get(pageContentInput).clear()
        cy.get(pageContentInput).type(pageContent_,{ force: true });
        screenshot.takeScreenshot('FillPageContent')
        cy.get(pageTitleInput).clear();
        cy.get(pageTitleInput).type(pageTitle_,{ force: true });
        screenshot.takeScreenshot('FillPageTittle')
        cy.wait(delay);
        cy.get(updatebutton).first().click();
    }

    TypeEmptyPage() {
        cy.get(pageTitleInput).clear();
        screenshot.takeScreenshot('BeforeEmptyPageTitle')
        cy.get(pageContentInput).clear();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterEmptyPageContent')
    }

    CreateAndPublishPage(pageTitle_, pageContent_) {
        this.ClearAndTypePage(pageTitle_, pageContent_);
        this.PublishPage();
    }

    CreateAndPublishPageSpecial(baseData){
        this.CreateAndPublishPage(baseData.pageTitle_Special, baseData.pageContent_Special);
    }

    CreateEmptyPage(){
        this.TypeEmptyPage();
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

    SeeEmptyPagePublished() {
        screenshot.takeScreenshot('BeforeClickDropdownFilter')
        cy.get(dropdownPageFilter).click();
        screenshot.takeScreenshot('AfterClickDropdownFilter')
        cy.get(optionPublishedPage).click()
        screenshot.takeScreenshot('AfterPublishedPageFilter')
        cy.wait(delay);
        cy.get(classPublisdPageTitle).first().should('to.contain', '(Untitled)'.trim());
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationPublishedPageFilter')
    }

    SeeSpecialPagePublished(baseData) {
        this.SeePagePublished(baseData.pageTitle_Special);
    }

    LongTitleUpdateError(){
        screenshot.takeScreenshot('BeforeTitlePublishErrorMessage')
        cy.get(titleupdateerrormessage).should('be.visible');
        screenshot.takeScreenshot('AfterTitlePublishErrorMessage')
        cy.get(titleupdateerrormessage).should('to.contain', 'Update failed: Title cannot be longer than 255 characters.')
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationTitlePublishErrorMessage')
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
        screenshot.takeScreenshot('AfterChangePageURL')
        cy.get(pageSideMenuButton).click();
        screenshot.takeScreenshot('AfterCloseSideMenuButton')
    }

    ChangePageURLMultilanguage(pageURL_){
        screenshot.takeScreenshot('BeforeClickSideMenuButton')
        cy.get(pageSideMenuButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterClickSideMenuButton')
        cy.get(pageUrlField).clear();
        cy.get(pageUrlField).type(pageURL_, {force: true});
        cy.wait(delay);
        screenshot.takeScreenshot('AfterChangePageURL')
        cy.get(pageSideMenuButton).click();
        screenshot.takeScreenshot('AfterCloseSideMenuButton')
    }

    ChangePageDate(pageDate_){
        screenshot.takeScreenshot('BeforeClickSideMenuButton')
        cy.get(pageSideMenuButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterClickSideMenuButton')
        cy.get(pageDateField).clear();
        cy.get(pageDateField).type(pageDate_, {force: true});
        cy.wait(delay);
        screenshot.takeScreenshot('AfterChangePageDate')
        cy.get(pageSideMenuButton).click();
        screenshot.takeScreenshot('AfterCloseSideMenuButton')
    }


    CreateAndEditPageURL(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.PublishPage();
        this.EditPage();
        this.ChangePageURL(baseData.pageURL)
    }

    CreateAndPublishPageURL(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.ChangePageURL(baseData.pageURL);
        this.PublishPage();
    }

    CreateAndPublishPageURLMultilanguage(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.ChangePageURL(baseData.pageURL_multilanguage);
        this.PublishPage();
    }

    CreateAndPublishPageURLSpecial(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.ChangePageURL(baseData.pageURL_symbols);
        this.PublishPage();
    }

    CreateAndPublishPageURLSEmojis(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.ChangePageURL(baseData.pageURL_emojis);
        this.PublishPage();
    }

    EditPage(){
        cy.get(dropdownPageFilter).click();
        cy.get(optionPublishedPage).click();
        screenshot.takeScreenshot('BeforeClickEditButton')
        cy.get(editbutton).first().click();
        screenshot.takeScreenshot('AfterClickEditButton')
    }

    CreateAndEditPageLongTitle(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.PublishPage();
        this.EditPage();
        this.ClearAndTypeLongPageUpdate(baseData.pageTitle_256, baseData.pageContent);
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
        this.ClickPublishPageValidation()
    }

    PageLongExcerptPublishError(){
        screenshot.takeScreenshot('BeforeTitlePublishErrorMessage')
        cy.get(excerptValidationError).should('be.visible');
        screenshot.takeScreenshot('AfterTitlePublishErrorMessage')
        cy.wait(delay);
    }

    CreateAndEditEmptyPage(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.PublishPage();
        this.EditPage();
        this.CreateEmptyPage();
        cy.get(updatebutton).first().click();
        cy.get(PageBackMenu).click();
    }

    CreateDuplicatedPages(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.PublishPage();
        cy.get(idNavigateCreatePage).click();
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.PublishPage();
    }

    CreateAndPublishPageWithOlderDate(baseData){
        this.ClearAndTypePage(baseData.pageTitle, baseData.pageContent);
        this.ChangePageDate(baseData.pageDate);
        this.PublishPage();
    }

    SeeOlderPagePublished(pageTitle_ = this.pageTitle){
        screenshot.takeScreenshot('BeforeClickDropdownFilter')
        cy.get(dropdownPageFilter).click();
        screenshot.takeScreenshot('AfterClickDropdownFilter')
        cy.get(optionPublishedPage).click()
        screenshot.takeScreenshot('AfterPublishedPageFilter')
        cy.get(dropdownDateFilter).click();
        cy.get(optionOldestPage).click()
        screenshot.takeScreenshot('AfterDatePageFilter')
        cy.wait(delay);
        cy.get(classPublisdPageTitle).first().should('to.contain', pageTitle_.trim());
        cy.wait(delay);
        screenshot.takeScreenshot('ValidationPublishedPageFilter')
    }

    UpdateButtonNotActive(){
        screenshot.takeScreenshot('UpdateButtonDisabled')
        cy.get(updateButtonStatus).should('be.disabled');
    }
}

export const pagePage = new PagePage();