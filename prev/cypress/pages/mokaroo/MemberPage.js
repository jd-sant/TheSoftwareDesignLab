const delay = Cypress.env('delay') || 300;
import { screenshot } from '../Screenshots';

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
const memberNoteInputResponse = 'div[class="form-group mb0 gh-member-note error"] > p.response';
const memberNameInputResponse = '.gh-cp-member-email-name > :nth-child(1) > p.response';
const retrySaveMemberButton = 'span[data-test-task-button-state="failure"]';
const optionsMember = 'button[data-test-button="member-actions"] > :nth-child(1)';
const deleteMemberButton = 'button[data-test-button="delete-member"]';
const deleteMemberModalButton = 'div[data-test-modal="delete-member"] > :nth-child(4) > :nth-child(2) > span[data-test-task-button-state="idle"]';
const bodyTag = 'div[data-test-no-matching-members] > h4';

class MemberPage {

    NavigateToCreateMemberPage() {
        cy.wait(delay);
        cy.get(newMemberButton).click();
        cy.wait(delay);
    }

    ClearAndTypeMember(memberName_, memberEmail_, memberLabel_, memberNote_) {
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

    CreateAndSaveMember(baseData) {
        console.log(baseData)
        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember(baseData.memberName, baseData.memberEmail, baseData.memberLabel, baseData.memberNote);
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
    }

    SeeMemberCreated(baseData) {
        screenshot.takeScreenshot('memberSaveAction');
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('returnToMemberPage');
        cy.get(searchMemberInput).clear({ force: true }).type(baseData.memberName, { force: true });
        cy.get(searchMemberInput).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('findMemberCreated');
        cy.get(classCreatedMemberName).first().should('to.contain', baseData.memberName);
    }
    // ************************************************************
    CreateEmptyNameMember(baseData) {
        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember(' ', baseData.memberEmail, baseData.memberLabel, baseData.memberNote);
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');
    }

    SeeMemberCreatedWithEmptyName(baseData) {
        screenshot.takeScreenshot('memberSaveAction');
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('returnToMemberPage');
        cy.get(searchMemberInput).clear({ force: true }).type(baseData.memberEmail, { force: true });
        cy.get(searchMemberInput).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('findMemberCreated');
        cy.get(classCreatedMemberName).first().should('to.contain', baseData.memberEmail);
    }

    // ************************************************************
    CreateMemberInvalidEmail(baseData) {
        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember(baseData.memberName, baseData.memberEmail.replace("@", ""), baseData.memberLabel, baseData.memberNote);
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
    CreateMemberInvalidDotsEmail(baseData) {
        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember(baseData.memberName, baseData.memberDotsEmail, baseData.memberLabel, baseData.memberNote);
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');
    }

    SeeFormDotsEmailError() {
        screenshot.takeScreenshot('InvalidEmailError');
        cy.wait(delay);
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberEmailInputResponse).should('to.contain', 'Invalid Email.');
    }

    // ************************************************************
    CreateMemberOverflowName(baseData) {
        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember(baseData.memberNoteLong.substring(0, 193) + "a", baseData.memberEmail, baseData.memberLabel, baseData.memberNote);
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');
    }

    SeeFormNameError() {
        screenshot.takeScreenshot('InvalidNameError');
        cy.wait(delay);
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberNameInputResponse).should('to.contain', 'Name cannot be longer than 191 characters.');
    }

    // ************************************************************
    CreateMemberOverflowLabel(baseData) {
        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember(baseData.memberName, baseData.memberEmail, baseData.memberNoteLong.substring(0, 193) + "a", baseData.memberNote);
        screenshot.takeScreenshot('memberAfterFill');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');
    }

    SeeFormLabelError() {
        screenshot.takeScreenshot('InvalidNameError');
        cy.wait(delay);
        cy.get(retrySaveMemberButton).should('be.visible');
        cy.get(memberNameInputResponse).should('not.contain', 'Validation failed for name.');
    }

    // ************************************************************
    CreateMemberOverflowNote(baseData) {
        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember(baseData.memberName, baseData.memberEmail, baseData.memberLabel, baseData.memberNoteLong.substring(0, 510));
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
    CreateMemberExistingEmail(baseData, baseData2) {
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(baseData.memberName, baseData.memberEmail, baseData.memberLabel, baseData.memberNote);
        this.SaveMember();
        cy.wait(delay);
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);

        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigatedToCreateMemberPage');
        screenshot.takeScreenshot('memberBeforeFill');
        this.ClearAndTypeMember(baseData2.memberName, baseData.memberEmail, baseData2.memberLabel, baseData2.memberNote);
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
    ClearAndTypeEditMember(memberName_, memberLabel_, memberNote_) {
        cy.get(memberNameInput).clear({ force: true }).type(memberName_, { force: true });
        cy.get(memberLabelInput).clear({ force: true }).type(memberLabel_, { force: true });
        cy.get(memberLabelInput).type('{enter}', { force: true });
        cy.get(memberLabelInput).type('{esc}', { force: true });
        cy.get(memberNoteInput).clear({ force: true }).type(memberNote_, { force: true });
        cy.wait(delay);
    }

    EditAndSaveMember(baseData, baseData2) {
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(baseData.memberName, baseData.memberEmail, baseData.memberLabel, baseData.memberNote);
        this.SaveMember();
        cy.wait(delay);
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);

        screenshot.takeScreenshot('navigatedToMemberPage');
        cy.get(classCreatedMemberName).first().click({ force: true });
        screenshot.takeScreenshot('memberBeforeFillEdit');
        this.ClearAndTypeEditMember(baseData2.memberName, baseData2.memberLabel, baseData2.memberNote);
        screenshot.takeScreenshot('memberAfterFillEdit');
        this.SaveMember();
        screenshot.takeScreenshot('memberSaveAction');

    }

    SeeMemberEdited(baseData2) {
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('returnToMemberPage');
        cy.get(searchMemberInput).clear({ force: true }).type(baseData2.memberName, { force: true });
        cy.get(searchMemberInput).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('findMemberEdited');
        cy.wait(delay);
        cy.get(classCreatedMemberName).first().should('to.contain', baseData2.memberName);
    }

    // ************************************************************ 
    DeleteMember(baseData) {
        screenshot.takeScreenshot('navigatedToMemberPage');
        this.NavigateToCreateMemberPage();
        this.ClearAndTypeMember(baseData.memberName, baseData.memberEmail, baseData.memberLabel, baseData.memberNote);
        this.SaveMember()
        cy.wait(delay);
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);

        cy.get(searchMemberInput).clear({ force: true }).type(baseData.memberName, { force: true });
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

    NotSeeMemberDeleted(baseData) {
        cy.wait(delay);
        cy.get(searchMemberInput).clear({ force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('returnToMemberPage');
        cy.get(searchMemberInput).type(baseData.memberName, { force: true });
        cy.get(searchMemberInput).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('notFindMemberDeleted');
        cy.wait(delay);
        cy.get(bodyTag).should('be.visible');
    }


}

export const memberPage = new MemberPage();