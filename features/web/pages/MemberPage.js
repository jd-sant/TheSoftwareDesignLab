const { faker, fakerAR, fakerRU, fakerZH_CN, fakerJA, fakerHY } = require('@faker-js/faker');
const assert = require('assert');
const delay = 2000;
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

    editedMemberName = faker.person.fullName();
    editedMemberInvalidEmail = faker.lorem.words(1);
    editedMemberLabel = faker.lorem.words(1);
    editedMemberNote = faker.lorem.words(3);

    async NavigateToCreateMemberPage(context) {
        await context.driver.pause(delay);
        await context.driver.$(newMemberButton).click();
        await context.driver.pause(delay);
    }

    async ClearAndTypeMember(context, memberName_ = this.memberName, memberEmail_ = this.memberEmail, memberLabel_ = this.memberLabel, memberNote_ = this.memberNote) {
        await context.driver.$(memberNameInput).click();
        await context.driver.$(memberNameInput).setValue(memberName_);
        await context.driver.$(memberEmailInput).click();
        await context.driver.$(memberEmailInput).setValue(memberEmail_);
        await context.driver.$(memberLabelInput).click();
        await context.driver.$(memberLabelInput).setValue(memberLabel_);
        await context.driver.$(memberLabelInput).setValue('\uE007');
        await context.driver.$(memberLabelInput).setValue('\uE00C');
        await context.driver.$(memberNoteInput).click();
        await context.driver.$(memberNoteInput).setValue(memberNote_);
        await context.driver.pause(delay);
    }

    async SaveMember(context) {
        await context.driver.$(saveMemberButton).click();
        await context.driver.pause(delay);
    }
    
    async CreateAndSaveMember(context) {
        await this.NavigateToCreateMemberPage(context);
        await this.ClearAndTypeMember(context);
        await this.SaveMember(context);
    }

    async SeeMemberCreated(context, memberName_ = this.memberName) {
        await context.driver.$(memberSection).click();
        await context.driver.pause(delay);        
        await context.driver.$(searchMemberInput).setValue(memberName_);// type                
        const memberName = await context.driver.$(classCreatedMemberName).getText();        
        await context.driver.pause(delay);
        return await assert.equal(memberName,memberName_);
    }

// ************************************************************
    async CreateMemberInvalidEmail(context) {
        await this.NavigateToCreateMemberPage(context);
        await this.ClearAndTypeMember(context, this.memberName, this.memberInvalidEmail, this.memberLabel, this.memberNote);
        await this.SaveMember(context);
    }

    async SeeFormError(context) {
        const isVisible = await (await context.driver.$(retrySaveMemberButton)).isDisplayed();
        const errorMessage = await context.driver.$(memberEmailInputResponse).getText();
        await assert.equal(isVisible,true);
        return await assert.equal(errorMessage,'Invalid Email.');
    }

// ************************************************************
    async CreateMemberExistingEmail(context) {        
        await this.CreateAndSaveMember(context);
        await context.driver.pause(delay);        
        await context.driver.$(memberSection).click();
        await context.driver.pause(delay);        
        await this.CreateAndSaveMember(context, faker.person.fullName(), this.memberEmail, faker.lorem.words(1), faker.lorem.words(3));
        await this.SaveMember(context);
    }

    async SeeExistingEmailError(context) {
        const isVisible = await (await context.driver.$(retrySaveMemberButton)).isDisplayed();
        const errorMessage = await context.driver.$(memberEmailInputResponse).getText();
        await assert.equal(isVisible,true);
        return await assert.equal(errorMessage,'Member already exists. Attempting to add member with existing email address');
    }

// ************************************************************
    async ClearAndTypeEditMember(context, memberName_ = this.editedMemberName, memberLabel_ = this.editedMemberLabel, memberNote_ = this.editedMemberNote) {
        await context.driver.$(memberNameInput).click();
        await context.driver.$(memberNameInput).setValue(memberName_)        
        await context.driver.$(memberLabelInput).click();
        await context.driver.$(memberLabelInput).setValue(memberLabel_);
        await context.driver.$(memberLabelInput).setValue('\uE007');
        await context.driver.$(memberLabelInput).setValue('\uE00C');
        await context.driver.$(memberNoteInput).click();
        await context.driver.$(memberNoteInput).setValue(memberNote_);
        await context.driver.pause(delay);
    }

    async EditAndSaveMember(context) {
        await this.CreateAndSaveMember(context);
        await context.driver.pause(delay); 
        await context.driver.$(memberSection).click();
        await context.driver.pause(delay);        
        
        await context.driver.$(classCreatedMemberName).click();
        await this.ClearAndTypeEditMember(context);
        await this.SaveMember(context);
        await context.driver.pause(delay);
    }

    async SeeMemberEdited(context, memberName_ = this.editedMemberName) {
        await context.driver.$(memberSection).click();
        await context.driver.pause(delay);
        await context.driver.$(searchMemberInput).setValue(memberName_)         
        const memberName = await context.driver.$(classCreatedMemberName).getText();    
        await context.driver.pause(delay);
        return await assert.equal(memberName,memberName_);       
    }

// ************************************************************

    async DeleteMember(context, memberName_ = this.memberName) {
        await this.CreateAndSaveMember(context);
        await context.driver.pause(delay); 
        await context.driver.$(memberSection).click();
        await context.driver.pause(delay);        

        await context.driver.$(searchMemberInput).click();
        await context.driver.$(searchMemberInput).setValue(memberName_)  
        await context.driver.pause(delay);
        await context.driver.$(classCreatedMemberName).click();
        await context.driver.pause(delay);
        await context.driver.$(optionsMember).click();
        await context.driver.$(deleteMemberButton).click();
        await context.driver.pause(delay);
        await context.driver.$(deleteMemberModalButton).click();        
        await context.driver.pause(delay);        
    }

    async NotSeeMemberDeleted(context, memberName_ = this.memberName) {
        await context.driver.$(searchMemberInput).click();
        await context.driver.$(searchMemberInput).setValue(memberName_)  
        await context.driver.pause(delay);
        
        const isVisible = await (await context.driver.$(bodyTag)).isDisplayed();
        return await assert.equal(isVisible,true);
    }
}

module.exports = new MemberPage();