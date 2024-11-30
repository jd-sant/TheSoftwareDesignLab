const delay = Cypress.env('delay') || 300;
import { screenshot } from '../support/Screenshots';


const filterButton = 'div[data-test-button="members-filter-actions"] > :nth-child(1)';
const filterField = 'select[data-test-select="members-filter"]';
const filterTypeCondition = 'select[data-test-select="members-filter-operator"]';
const filterConditionLabel = 'input[class="ember-power-select-trigger-multiple-input"]';
const filterConditionName = 'section[class="gh-filters"] > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3)';
const applyFiltersButton = 'button[data-test-button="members-apply-filter"]';


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


    // ************************************************************
    CreateMemberFindByLabelIs(baseData, baseData2, baseData3) {
        console.log(baseData)
        screenshot.takeScreenshot('navigated1ToMemberPage');
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigated1ToCreateMemberPage');
        screenshot.takeScreenshot('member1BeforeFill');
        this.ClearAndTypeMember(baseData.memberName, baseData.memberEmail, baseData.memberLabel, baseData.memberNote);
        screenshot.takeScreenshot('member1AfterFill');
        this.SaveMember();

        screenshot.takeScreenshot('member1SaveAction');
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('return1ToMemberPage');

        console.log(baseData2)
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigated2ToCreateMemberPage');
        screenshot.takeScreenshot('member2BeforeFill');
        this.ClearAndTypeMember(baseData2.memberName, baseData2.memberEmail, baseData.memberLabel, baseData2.memberNote);
        screenshot.takeScreenshot('member2AfterFill');
        this.SaveMember();

        screenshot.takeScreenshot('member2SaveAction');
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('return2ToMemberPage');

        console.log(baseData3)
        this.NavigateToCreateMemberPage();
        screenshot.takeScreenshot('navigated3ToCreateMemberPage');
        screenshot.takeScreenshot('member3BeforeFill');
        this.ClearAndTypeMember(baseData3.memberName, baseData3.memberEmail, baseData.memberLabel, baseData3.memberNote);
        screenshot.takeScreenshot('member3AfterFill');
        this.SaveMember();

        screenshot.takeScreenshot('member3SaveAction');
        cy.get(memberSection).click({ force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('return3ToMemberPage');
    }


    SeeMembersCreatedByLabelIs(baseData, baseData2, baseData3) {
        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('label');
        cy.get(filterTypeCondition).select('is');
        cy.get(filterConditionLabel).click({ force: true }).type(baseData.memberLabel, { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByLabelIs');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByLabelIs');

        cy.get('body').should('contain', baseData.memberEmail);
        cy.get('body').should('contain', baseData2.memberEmail);
        cy.get('body').should('contain', baseData3.memberEmail);
    }

    // ************************************************************
    CreateMemberFindByLabelIsNot(baseData, baseData2, baseData3) {
        this.CreateMemberFindByLabelIs(baseData, baseData2, baseData3);
    }


    SeeMembersCreatedByLabelIsNot(baseData, baseData2, baseData3) {
        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('label');
        cy.get(filterTypeCondition).select('is-not');
        cy.get(filterConditionLabel).click({ force: true }).type(baseData2.memberLabel, { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByLabelIsNot');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByLabelIsNot');

        cy.get('body').should('contain', baseData.memberEmail);
        cy.get('body').should('contain', baseData2.memberEmail);
        cy.get('body').should('contain', baseData3.memberEmail);
    }

    // ************************************************************
    CreateMemberFindByNameIs(baseData, baseData2, baseData3) {
        this.CreateMemberFindByLabelIs(baseData, baseData2, baseData3);
    }


    SeeMembersCreatedByNameIs(baseData, baseData2, baseData3) {
        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('is');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData.memberName, { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameIs');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameIs');

        cy.get('body').should('contain', baseData.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('is');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData2.memberName, { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameIs2');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameIs2');

        cy.get('body').should('contain', baseData2.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('is');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData3.memberName, { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameIs3');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameIs3');

        cy.get('body').should('contain', baseData3.memberEmail);
    }

    // ************************************************************
    CreateMemberFindByNameContains(baseData, baseData2, baseData3) {
        this.CreateMemberFindByLabelIs(baseData, baseData2, baseData3);
    }


    SeeMembersCreatedByNameContains(baseData, baseData2, baseData3) {
        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('contains');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData.memberName.substring(1, Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameContains');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameContains');

        cy.get('body').should('contain', baseData.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('contains');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData2.memberName.substring(1, Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameContains2');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameContains2');

        cy.get('body').should('contain', baseData2.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('contains');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData3.memberName.substring(1, Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameContains3');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameContains3');

        cy.get('body').should('contain', baseData3.memberEmail);
    }

    // ************************************************************
    CreateMemberFindByNameNotContains(baseData, baseData2, baseData3) {
        this.CreateMemberFindByLabelIs(baseData, baseData2, baseData3);
    }


    SeeMembersCreatedByNameNotContains(baseData, baseData2, baseData3) {
        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('does-not-contain');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData.memberName, { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameNotContains');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameNotContains');

        cy.get('body').should('contain', baseData2.memberEmail);
        cy.get('body').should('contain', baseData3.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('does-not-contain');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData2.memberName, { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameNotContains2');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameNotContains2');

        cy.get('body').should('contain', baseData.memberEmail);
        cy.get('body').should('contain', baseData3.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('does-not-contain');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData3.memberName, { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameNotContains3');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameNotContains3');

        cy.get('body').should('contain', baseData.memberEmail);
        cy.get('body').should('contain', baseData2.memberEmail);
    }

    // ************************************************************
    CreateMemberFindByNameStartsWith(baseData, baseData2, baseData3) {
        this.CreateMemberFindByLabelIs(baseData, baseData2, baseData3);
    }


    SeeMembersCreatedByNameStartsWith(baseData, baseData2, baseData3) {
        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('starts-with');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData.memberName.substring(0, Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameStartsWith');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameStartsWith');

        cy.get('body').should('contain', baseData.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('starts-with');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData2.memberName.substring(0, Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameStartsWith2');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameStartsWith2');

        cy.get('body').should('contain', baseData2.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('starts-with');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData3.memberName.substring(0, Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameStartsWith3');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameStartsWith3');

        cy.get('body').should('contain', baseData3.memberEmail);
    }

    // ************************************************************
    CreateMemberFindByNameEndsWith(baseData, baseData2, baseData3) {
        this.CreateMemberFindByLabelIs(baseData, baseData2, baseData3);
    }


    SeeMembersCreatedByNameEndsWith(baseData, baseData2, baseData3) {
        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('ends-with');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData.memberName.substring(Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameEndsWith');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameEndsWith');

        cy.get('body').should('contain', baseData.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('ends-with');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData2.memberName.substring(Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameEndsWith2');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameEndsWith2');

        cy.get('body').should('contain', baseData2.memberEmail);

        cy.get(filterButton).click({ force: true });
        cy.get(filterField).select('name');
        cy.get(filterTypeCondition).select('ends-with');
        cy.get(filterConditionName).click({ force: true }).clear({ force: true }).type(baseData3.memberName.substring(Math.ceil(baseData.memberName.length / 2)), { force: true }).type('{enter}', { force: true });
        cy.wait(delay);
        screenshot.takeScreenshot('FilterByNameEndsWith3');
        cy.get(applyFiltersButton).click({ force: true });
        screenshot.takeScreenshot('ResultFilterByNameEndsWith3');

        cy.get('body').should('contain', baseData3.memberEmail);
    }

    // ************************************************************
}

export const memberPage = new MemberPage();