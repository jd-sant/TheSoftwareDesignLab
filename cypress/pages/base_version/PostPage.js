import { faker } from '@faker-js/faker';
import { fakerHY as fakerArmenian } from '@faker-js/faker';
import { fakerRU as fakerRussian } from '@faker-js/faker';
import { fakerZH_CN as fakerChinese } from '@faker-js/faker';
import { fakerJA as fakerJapanese } from '@faker-js/faker';
import { fakerAR as fakerArabic } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
const postTitleInput = 'textarea[placeholder="Post Title"]';
const postContentInput = '.koenig-editor__editor';
const postContentImageInput = '[data-secondary-instance="false"] > :nth-child(1) > :nth-child(1) > [contenteditable="true"][data-koenig-dnd-container="true"] > p[data-koenig-dnd-droppable="true"]';
const publishPostButton = 'main > section > header > section > div:nth-child(2) > div > div:nth-child(1) > span';
const confirmPublishButton = 'footer > button:nth-child(2)';
const finalPublishButton = '[data-test-button="confirm-publish"]';
const modalClass = '.modal-content';
const closeModalButton = 'main > section > header > div > div:nth-child(1) > a';
const dropdownPostFilter = '.gh-contentfilter-type > .ember-view > svg';
const optionPublishedPost = '.ember-power-select-option[data-option-index="2"]';
const classPublisdPostTitle = '.gh-content-entry-title';
const imagePostFeatureClass = '.gh-editor-feature-image-unsplash'
const imageUnplashClass = '.gh-unsplash-photo-container > .gh-unsplash-photo-overlay > .gh-unsplash-photo-footer > .gh-unsplash-button';
const imageUnplashContentClass = '[data-kg-unsplash-insert-button="true"]';
const postAddCard = 'button[aria-label="Add a card"]';
const postUnplashCard = 'button[data-kg-card-menu-item="Unsplash"]';

class PostPage {
    
    // Contador para los screenshots
    screenshotCounter = 0;
    currentTest = Cypress.currentTest?.title || 'unnamedTest';

    /**
      * Toma un screenshot con un nombre único y ordenado.
      * @param {string} name - Nombre del screenshot.
      */
    takeScreenshot(name) {
        const pathScreenShot = Cypress.currentTest.title
        if (pathScreenShot != this.currentTest){
            this.currentTest = Cypress.currentTest.title
            this.screenshotCounter = 0
            this.datetime = new Date().toISOString().replace(/:/g,".");
        }
        const formattedCounter = String(this.screenshotCounter).padStart(3, '0'); // Formatea el número con ceros iniciales
        const screenshotName = `${formattedCounter}_${name}`;
        // cy.screenshot(`${this.datetime}-${pathScreenShot}/${screenshotName}`);
        cy.screenshot(`${pathScreenShot}/${screenshotName}`);
        this.screenshotCounter++; // Incrementa el contador
        
    }

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
            this.takeScreenshot('SelectUnplashImage');
            cy.wrap(randomImage).click({force: true});
            this.takeScreenshot('SelectUnplashImageClick');
            cy.wait(delay);
        });
    }

    PublishPost(){
        cy.get(publishPostButton).click()
        this.takeScreenshot('PublishPostClick-1');
        cy.wait(2000)
        cy.get(confirmPublishButton).click();
        this.takeScreenshot('PublishPostClick-2');
        // cy.get(finalPublishButton).click();
        // this.takeScreenshot('PublishPostClick-3');
        // cy.wait(delay);
        // cy.get(modalClass).should('be.visible');
        // this.takeScreenshot('PublishPostClick-4');
        cy.get(closeModalButton).click();
        this.takeScreenshot('CloseModal');
        cy.wait(delay);
    }

    ClearAndTypePost(postTitle_ = this.postTitle, postContent_ = this.postContent) {
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(postTitle_);
        this.takeScreenshot('FillPostTittle')
        cy.get(postContentInput).clear()
        cy.get(postContentInput).type(postContent_);
        this.takeScreenshot('FillPostContent')
        cy.wait(delay);
    }

    ClearAndTypePostWithImages(postTitle_ = this.postTitle, postContent_ = this.postContent) {
        cy.get(postTitleInput).clear();
        cy.get(postTitleInput).type(postTitle_);
        this.takeScreenshot('FillPostTittleImage')
        cy.get(postContentInput).clear()
        cy.get(postAddCard).click();
        this.takeScreenshot('AddCard')
        cy.get(postUnplashCard).click();
        this.takeScreenshot('AddUnplashCard')
        this.AddUnplashImage(imageUnplashContentClass);
        cy.get(postContentImageInput).clear();
        cy.get(postContentImageInput).type(postContent_);
        this.takeScreenshot('FillPostContentImage')
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
        this.takeScreenshot('DropdownPostFilter');
        cy.get(optionPublishedPost).click()
        this.takeScreenshot('OptionPublishedPost');
        cy.wait(delay);
        cy.get(classPublisdPostTitle).first().should('to.contain', postTitle_);
        this.takeScreenshot('SeePostPublished');
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
        this.takeScreenshot('ClickImage');
        cy.wait(delay);
        this.AddUnplashImage();
        this.ClearAndTypePostWithImages(postTitle_, postContent_);
        this.PublishPost();
    }

    CreateAndPublishPostWithMultipleLanguages(){
        this.CreateAndPublishPost(this.postTitleMultilanguage, this.postContentMultilanguage);
    }
}

export const postPage = new PostPage();