import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;

class PostPage {

    postTitle = faker.lorem.words(3);
    postContent = faker.lorem.paragraphs(4,'\n');
    postTitleSpecial = faker.string.sample();
    postContentSpecial = faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample();

    thenFillThePostForm() {
        cy.get('textarea[data-test-editor-title-input]').clear();
        cy.get('textarea[data-test-editor-title-input]').type(this.postTitle);
        cy.get('[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p').clear()
        cy.get('[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p').type(this.postContent);
        cy.wait(delay);
    };

    thenFillThePostFormSpecial() {
        cy.get('textarea[data-test-editor-title-input]').clear();
        cy.get('textarea[data-test-editor-title-input]').type(this.postTitleSpecial);
        cy.get('[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p').clear()
        cy.get('[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p').type(this.postContentSpecial);
        cy.wait(delay);
    };

    thenPublishThePost() {
        cy.get('.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span').click()
        cy.wait(2000)
        cy.get('.gh-publish-cta > .gh-btn > span').click();
        cy.get('#ember61 > span').click();
        cy.wait(delay);
        cy.get('.modal-content').should('be.visible');
        cy.get('[data-test-button="close-publish-flow"]').click();
        cy.wait(delay);
    };

    thenSeePostPublished() {
        cy.get('.gh-contentfilter-type > .ember-view > svg').click();
        cy.get('.ember-power-select-option[data-option-index="2"]').click()
        cy.wait(delay);
        cy.get('.gh-content-entry-title').first().should('to.contain', this.postTitle || this.postTitleSpecial);
        cy.wait(delay);
    };

    thenSeeSpecialPostPublished() {
        cy.get('.gh-contentfilter-type > .ember-view > svg').click();
        cy.get('.ember-power-select-option[data-option-index="2"]').click()
        cy.wait(delay);
        cy.get('.gh-content-entry-title').first().should('to.contain', this.postTitleSpecial);
        cy.wait(delay);
    };

    thenGoToNewPostPage() {
        cy.get('#ember20').click();
        cy.wait(delay);
    };

}

export const postPage = new PostPage();