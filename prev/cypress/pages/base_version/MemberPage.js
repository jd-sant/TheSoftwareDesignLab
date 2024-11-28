import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
import { screenshot } from '../Screenshots';

const memberSection = 'h2[class="gh-canvas-title"] > :nth-child(1)';
const newMemberButton = 'a[class="ember-view gh-btn gh-btn-primary"]';
const saveMemberButton = 'button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]';
const memberNameInput = 'input[id="member-name"]';
const memberEmailInput = 'input[id="member-email"]';
const memberLabelInput = 'input[class="ember-power-select-trigger-multiple-input"]';
const memberNoteInput = 'textarea[id="member-note"]';
const searchMemberInput = 'div[class="relative gh-members-header-search"] > :nth-child(2)';
const classCreatedMemberName = 'h3[class="ma0 pa0 gh-members-list-name "]';
/*
const memberEmailInputResponse = '.gh-cp-member-email-name > :nth-child(2) > p.response';
const memberNoteInputResponse = 'div[class="form-group mb0 gh-member-note error"] > p.response';
const retrySaveMemberButton = 'span[data-test-task-button-state="failure"]';
const optionsMember = 'button[data-test-button="member-actions"] > :nth-child(1)';
const deleteMemberButton = 'button[data-test-button="delete-member"]';
const deleteMemberModalButton = 'div[data-test-modal="delete-member"] > :nth-child(4) > :nth-child(2) > span[data-test-task-button-state="idle"]';
const bodyTag = 'div[data-test-no-matching-members] > h4';
*/
class MemberPage {

    memberName = faker.person.fullName();
    memberEmail = faker.internet.email();
    memberInvalidEmail = faker.lorem.words(1);
    memberInvalidNote = faker.lorem.words(200).substring(0, 501);
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
        cy.get(memberNameInput).clear({ force: true }).type(memberName_, { force: true });
        cy.get(memberEmailInput).clear({ force: true }).type(memberEmail_, { force: true });
        cy.get(memberLabelInput).clear({ force: true }).type(memberLabel_, { force: true });
        cy.get(memberLabelInput).type('{enter}', { force: true });
        cy.get(memberLabelInput).type('{esc}', { force: true });
        cy.get(memberNoteInput).clear({ force: true }).type(memberNote_, { force: true });
        cy.wait(delay);        
    }

    SaveMember() {
        cy.get(saveMemberButton).click({ force: true });
        cy.wait(delay);       
    }

    CreateAndSaveMember() {
        screenshot.takeScreenshot('navigatedToMemberPage');               
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember();
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
    }

    SeeMemberCreated(memberName_ = this.memberName) {
        screenshot.takeScreenshot('memberSaveAction');
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('returnToMemberPage');
        cy.get(searchMemberInput).clear({ force: true }).type(memberName_, { force: true });
        cy.get(searchMemberInput).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('findMemberCreated');
        cy.get(classCreatedMemberName).first().should('to.contain', memberName_);
    }

/*    // ************************************************************
    CreateMemberInvalidEmail() {
        screenshot.takeScreenshot('navigatedToMemberPage');               
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');        
        this.ClearAndTypeMember(this.memberName, this.memberInvalidEmail, this.memberLabel, this.memberNote);
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');
    }

    SeeFormError() {
        screenshot.takeScreenshot('InvalidEmailError');
        cy.wait(delay);
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberEmailInputResponse).should('to.contain', 'Invalid Email.');       
    }

    // ************************************************************
    CreateMemberOverflowNote() {
        screenshot.takeScreenshot('navigatedToMemberPage');               
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');        
        this.ClearAndTypeMember(this.memberName2, this.memberEmail2, this.memberLabel2, this.memberInvalidNote);
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');
    }

    SeeFormNoteError() {
        screenshot.takeScreenshot('InvalidNoteError');
        cy.wait(delay);
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberNoteInputResponse).should('to.contain', 'Note is too long.');       
    }

    // ************************************************************

    CreateMemberExistingEmail() {
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(this.memberName2, this.memberEmail2, this.memberLabel2, this.memberNote2);
        this.SaveMember();
        cy.wait(delay);
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);

        screenshot.takeScreenshot('navigatedToMemberPage');               
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');        
        this.ClearAndTypeMember(faker.person.fullName(), this.memberEmail2, faker.lorem.words(1), faker.lorem.words(3));
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');
    }

    SeeExistingEmailError() {
        screenshot.takeScreenshot('AlreadyExistingEmailError');
        cy.wait(delay);        
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberEmailInputResponse).should('to.contain', 'Member already exists. Attempting to add member with existing email address')
    }

    // ************************************************************    
    ClearAndTypeEditMember(memberName_ = this.editedMemberName, memberLabel_ = this.editedMemberLabel, memberNote_ = this.editedMemberNote) {        
        cy.get(memberNameInput).clear({ force: true }).type(memberName_, { force: true });
        cy.get(memberLabelInput).clear({ force: true }).type(memberLabel_, { force: true });
        cy.get(memberLabelInput).type('{enter}', { force: true });
        cy.get(memberLabelInput).type('{esc}', { force: true });
        cy.get(memberNoteInput).clear({ force: true }).type(memberNote_, { force: true });
        cy.wait(delay);        
    }

    EditAndSaveMember() {                   
        this.NavigateToCreateMemberPage();        
        this.ClearAndTypeMember(this.memberName3, this.memberEmail3, this.memberLabel3, this.memberNote3);
        this.SaveMember();
        cy.wait(delay);
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);

        screenshot.takeScreenshot('navigatedToMemberPage');    
        cy.get(classCreatedMemberName).first().click({ force: true });
        screenshot.takeScreenshot('memberBeforeFillEdit');        
        this.ClearAndTypeEditMember();
        screenshot.takeScreenshot('memberAfterFillEdit');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');

    }

    SeeMemberEdited(memberName_ = this.editedMemberName) {
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('returnToMemberPage');
        cy.get(searchMemberInput).clear({ force: true }).type(memberName_, { force: true });
        cy.get(searchMemberInput).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('findMemberEdited');
        cy.wait(delay);
        cy.get(classCreatedMemberName).first().should('to.contain', memberName_);
    }

    // ************************************************************    

    DeleteMember(memberName_ = this.memberName4) {
        screenshot.takeScreenshot('navigatedToMemberPage'); 
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(this.memberName4, this.memberEmail4, this.memberLabel4, this.memberNote4);
        this.SaveMember()
        cy.wait(delay);
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);

        cy.get(searchMemberInput).clear({ force: true }).type(memberName_, { force: true });
        cy.get(searchMemberInput).type('{enter}', { force: true });        
        cy.wait(delay);
        cy.get(classCreatedMemberName).first().click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('selectMemberToDelete');
        cy.get(optionsMember).first().click({ force: true });
        cy.get(deleteMemberButton).first().click({ force: true });        
        cy.wait(delay);
        screenshot.takeScreenshot('deleteMemberActionModal');
        cy.get(deleteMemberModalButton).last().click({ force: true });
        cy.wait(delay);                
    }

    NotSeeMemberDeleted(memberName_ = this.memberName4) {        
        cy.wait(delay);
        cy.get(searchMemberInput).clear({ force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('returnToMemberPage');
        cy.get(searchMemberInput).type(memberName_, { force: true });
        cy.get(searchMemberInput).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('notFindMemberDeleted');
        cy.wait(delay);
        cy.get(bodyTag).should('be.visible');
    }
*/
}

export const memberPage = new MemberPage();