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
const memberEmailInputResponse = '.gh-cp-member-email-name > :nth-child(2) > p.response';
const retrySaveMemberButton = 'span[data-test-task-button-state="failure"]';
const optionsMember = 'button[data-test-button="member-actions"] > :nth-child(1)';
const deleteMemberButton = 'button[data-test-button="delete-member"]';
const deleteMemberModalButton = 'div[data-test-modal="delete-member"] > :nth-child(4) > :nth-child(2) > span[data-test-task-button-state="idle"]';
const bodyTag = 'div[data-test-no-matching-members] > h4';

class MemberPage {

    memberName = faker.person.fullName();
    memberEmail = faker.internet.email();
    memberInvalidEmail = faker.lorem.words(1);
    memberLabel = faker.lorem.words(1);
    memberNote = faker.lorem.words(3);

    memberName2 = faker.person.fullName();
    memberEmail2 = faker.internet.email();
    memberLabel2 = faker.lorem.words(1);
    memberNote2 = faker.lorem.words(3);

    memberName3 = faker.person.fullName();
    memberEmail3 = faker.internet.email();
    memberLabel3 = faker.lorem.words(1);
    memberNote3 = faker.lorem.words(3);

    memberName4 = faker.person.fullName();
    memberEmail4 = faker.internet.email();
    memberLabel4 = faker.lorem.words(1);
    memberNote4 = faker.lorem.words(3);

    editedMemberName = faker.person.fullName();
    editedMemberInvalidEmail = faker.lorem.words(1);
    editedMemberLabel = faker.lorem.words(1);
    editedMemberNote = faker.lorem.words(3);

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
    }

// ************************************************************
    CreateMemberInvalidEmail() {
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(this.memberName, this.memberInvalidEmail, this.memberLabel, this.memberNote);
        this.SaveMember();
    }

    SeeFormError() {
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberEmailInputResponse).should('to.contain', 'Invalid Email.')
    }

// ************************************************************
    CreateMemberExistingEmail() {  
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(this.memberName2, this.memberEmail2, this.memberLabel2, this.memberNote2);
        this.SaveMember();    
        cy.wait(delay);  
        cy.get(memberSection).click();
        cy.wait(delay);

        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(faker.person.fullName(), this.memberEmail2, faker.lorem.words(1), faker.lorem.words(3));
        this.SaveMember();
    }

    SeeExistingEmailError() {
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberEmailInputResponse).should('to.contain', 'Member already exists. Attempting to add member with existing email address')
    }

// ************************************************************    
    ClearAndTypeEditMember(memberName_ = this.editedMemberName, memberLabel_ = this.editedMemberLabel, memberNote_ = this.editedMemberNote) {
        cy.get(memberNameInput).clear();
        cy.get(memberNameInput).type(memberName_);
        cy.get(memberLabelInput).clear();
        cy.get(memberLabelInput).type(memberLabel_);
        cy.get(memberLabelInput).type('{enter}');
        cy.get(memberLabelInput).type('{esc}');
        cy.get(memberNoteInput).clear();
        cy.get(memberNoteInput).type(memberNote_);
        cy.wait(delay);
    }

    EditAndSaveMember() {
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(this.memberName3, this.memberEmail3, this.memberLabel3, this.memberNote3);
        this.SaveMember();   
        cy.wait(delay);
        cy.get(memberSection).click();
        cy.wait(delay);

        cy.get(classCreatedMemberName).first().click();
        this.ClearAndTypeEditMember();
        this.SaveMember();

    }

    SeeMemberEdited(memberName_ = this.editedMemberName) {
        cy.get(memberSection).click();
        cy.wait(delay);
        cy.get(searchMemberInput).clear();
        cy.get(searchMemberInput).type(memberName_);
        cy.get(classCreatedMemberName).first().should('to.contain', memberName_);
        cy.wait(delay);
    }

// ************************************************************    
    
    DeleteMember(memberName_ = this.memberName4) {      
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(this.memberName4, this.memberEmail4, this.memberLabel4, this.memberNote4);
        this.SaveMember()  
        cy.wait(delay);
        cy.get(memberSection).click();
        cy.wait(delay);
        
        cy.get(searchMemberInput).clear();
        cy.get(searchMemberInput).type(memberName_);        
        cy.wait(delay);
        cy.get(classCreatedMemberName).first().click();
        cy.wait(delay);
        cy.get(optionsMember).first().click();
        cy.get(deleteMemberButton).first().click();
        cy.wait(delay);
        cy.get(deleteMemberModalButton).last().click();
        cy.wait(delay);
    }

    NotSeeMemberDeleted(memberName_ = this.memberName4) {
        cy.get(searchMemberInput).clear();
        cy.get(searchMemberInput).type(memberName_);        
        cy.wait(delay);
        cy.get(bodyTag).should('be.visible');
    }

}

export const memberPage = new MemberPage();