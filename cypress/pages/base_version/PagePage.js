import { faker } from '@faker-js/faker';
import { screenshot } from '../Screenshots';

const delay = Cypress.env('delay') || 300;
const pageTitleInput = 'textarea[class="gh-editor-title ember-text-area gh-input ember-view"]';
const pageContentInput = 'div[class="koenig-editor__editor __mobiledoc-editor __has-no-content"]';
const publishPageButton = 'div[class="gh-publishmenu ember-view"]';
const confirmPublishButton = 'button[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]';
const finalPublishButton = '[data-test-button="confirm-publish"]';
const modalClass = 'div[class="ember-view ember-basic-dropdown-content ember-basic-dropdown-content--right ember-basic-dropdown-content--below ember-basic-dropdown--transitioned-in  gh-publishmenu-dropdown"]';
const closeModalButton = 'div[class="ml3 flex items-center"]';
const dropdownPageFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPage = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPageTitle = '.gh-content-entry-title';


class PagePage {

    pageTitle = faker.lorem.words(3);
    pageContent = faker.lorem.paragraphs(2,'\n');

    PublishPage(){
        screenshot.takeScreenshot('BeforeClickingPublishPageButton')
        cy.get(publishPageButton).click();
        screenshot.takeScreenshot('BeforeClickingConfirmPublishPageButton')
        cy.wait(2000);
        cy.get(confirmPublishButton).click();
        screenshot.takeScreenshot('AfterFinalPublishPage')
        cy.get(modalClass).should('be.visible');
        screenshot.takeScreenshot('BeforeCloseModalButton')
        cy.get(closeModalButton).click();
        screenshot.takeScreenshot('AfterCloseModalButton')
        cy.wait(delay);
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

}

export const pagePage = new PagePage();