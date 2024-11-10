import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;

const newTagButton = '.ember-view.gh-btn.gh-btn-primary';
const nameTag = '#tag-name';
const colorHexadecimalTag = '[data-test-input="accentColor"]';
const colorPickerTag = '.color-picker';
const descriptionTag = '#tag-description';
const imageTag = '.x-file-input';
const saveButtonTag = '[data-test-button="save"]';
const backButtonTag = '[data-test-link="tags-back"]';
const tableTags = '.view-container.content-list'
const listNameTag = '.gh-tag-list-name'

class TagPage {
    tagName = faker.word.adjective();
    tagColor = faker.color.rgb().substring(1);
    tagDescription = faker.lorem.paragraph()
    tagImage = '../fixtures/image.png'

    NavigateToCreateNewTag(){
        cy.get(newTagButton).click();
        cy.wait(delay);
    }

    ClearAndTypeTag(tagName_ = this.tagName, tagColor_ = this.tagColor, tagDescription_ = this.tagDescription, tagImage_ = this.tagImage){
        cy.get(nameTag).clear().type(tagName_);
        cy.get(colorHexadecimalTag).clear().type(tagColor_);
        cy.get(descriptionTag).clear().type(tagDescription_);
        cy.get(imageTag).attachFile(tagImage_);
        cy.wait(delay);
    }

    saveButtonTag(){
        cy.get(saveButtonTag).click();
        cy.wait(delay);
    }

    CreateTag(){
        this.NavigateToCreateNewTag();
        this.ClearAndTypeTag()
        this.saveButtonTag();
    }

    SeeTagCreated(tagName_ = this.tagName) {
        cy.get(backButtonTag).click();
        cy.wait(delay);
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        cy.wait(delay);
    }
}

export const tagPage = new TagPage()