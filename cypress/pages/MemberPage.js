import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;

const memberSection = 'a[data-test-link="members-back"]';
const newMemberButton = 'a[data-test-new-member-button="true"]';
const saveMemberButton = 'button[data-test-button="save"]';
const memberNameInput = 'input[data-test-input="member-name"]';
const memberEmailInput = 'input[data-test-input="member-email"]';
const memberLabelInput = 'input[class="ember-power-select-trigger-multiple-input"]';
const memberNoteInput = 'textarea[data-test-input="member-note"]';
const searchMemberInput = 'input[data-test-input="members-search"]';
const classCreatedMemberName = '.ma0.pa0.gh-members-list-name';
const memberEmailInputResponse = 'p.response';
const retrySaveMemberButton = 'span[data-test-task-button-state="failure"]';

class MemberPage {

    memberName = faker.person.fullName();
    memberEmail = faker.internet.email();
    memberInvalidEmail = faker.lorem.words(1);
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
        cy.get(saveMemberButton).click();
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

    CreateMemberInvalidEmail() {
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(this.memberName, this.memberInvalidEmail, this.memberLabel, this.memberNote);
        this.SaveMember();
    }

    SeeFormError() {
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberEmailInputResponse).should('to.contain', 'Invalid Email.')
        cy.wait(delay);
    }

    CreateMemberExistingEmail() {
        cy.wait(delay);
        this.CreateAndSaveMember(faker.person.fullName(), this.memberEmail, faker.lorem.words(1), faker.lorem.words(3));
    }

    SeeExistingEmailError() {
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberEmailInputResponse).should('to.contain', 'Member already exists. Attempting to add member with existing email address')
        cy.wait(delay);
    }



}

export const memberPage = new MemberPage();