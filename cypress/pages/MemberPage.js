import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;

const memberSection = 'a[data-test-link="members-back"]';
const newMemberButton = 'a[data-test-new-member-button="true"]';
const SaveMemberButton = 'button[data-test-button="save"]';
const memberNameInput = 'input[data-test-input="member-name"]';
const memberEmailInput = 'input[data-test-input="member-email"]';
const memberLabelInput = 'input[class="ember-power-select-trigger-multiple-input"]';
const memberNoteInput = 'textarea[data-test-input="member-note"]';
const searchMemberInput = 'input[data-test-input="members-search"]';
const classCreatedMemberName = '.ma0.pa0.gh-members-list-name';

class MemberPage {

    memberName = faker.person.fullName();
    memberEmail = faker.internet.email();
    memberLabel = faker.lorem.words(1);
    memberNote = faker.lorem.words(3);

    NavigateToCreateMemberPage() {
        cy.wait(delay);
        cy.get(newMemberButton).click();
        cy.wait(delay);
    }

    ClearAndTypeMember(memberName_ = this.memberName, memberEmail_ = this.memberEmail, memberLabel_ = this.memberLabel, memberNote_ = this.memberNote) {
        cy.get(memberNameInput).clear();
        cy.get(memberNameInput).type(memberName_);
        cy.get(memberEmailInput).clear();
        cy.get(memberEmailInput).type(memberEmail_);
        cy.get(memberLabelInput).clear();
        cy.get(memberLabelInput).type(memberLabel_);
        cy.get(memberLabelInput).type('{enter}');
        cy.get(memberLabelInput).type('{esc}');
        cy.get(memberNoteInput).clear();
        cy.get(memberNoteInput).type(memberNote_);
        cy.wait(delay);
    }

    SaveMember() {
        cy.get(SaveMemberButton).click();
        cy.wait(3000);
    }

    CreateAndSaveMember() {
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember();
        this.SaveMember();
    }

    SeeMemberCreated(memberName_ = this.memberName) {
        cy.get(memberSection).click();
        cy.wait(delay);
        cy.get(searchMemberInput).clear();
        cy.get(searchMemberInput).type(memberName_);
        cy.get(classCreatedMemberName).first().should('to.contain', memberName_);
        cy.wait(delay);
    }



}

export const memberPage = new MemberPage();