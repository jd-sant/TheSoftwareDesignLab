import { faker } from '@faker-js/faker';
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


}

export const memberPage = new MemberPage();