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
const memberEmailInputResponse = 'p.response';
const retrySaveMemberButton = 'span[data-test-task-button-state="failure"]';
const optionsMember = 'button[data-test-button="member-actions"] > :nth-child(1)';
const deleteMemberButton = 'button[data-test-button="delete-member"]';
const deleteMemberModalButton = 'span[data-test-task-button-state="idle"]';


class PostPage {

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
        await context.driver.$(memberLabelInput).setValue('{enter}');
        await context.driver.$(memberLabelInput).setValue('{esc}');
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
        await context.driver.$(searchMemberInput).clear();
        await context.driver.$(searchMemberInput).setValue(memberName_);// type                
        const memberName = await context.driver.$(classCreatedMemberName).getText();        
        await context.driver.pause(delay);
        return await assert.equal(memberName,memberName_);
    }
// ************************************************************


    async SeePostPublished(context, postTitle_ = this.postTitle) {
        await context.driver.$(dropdownPostFilter).click();
        await context.driver.$(optionPublishedPost).click();
        await context.driver.pause(delay);
        const postTitle = await context.driver.$(classPublisdPostTitle).getText();
        return await assert.equal(postTitle,postTitle_);
    }

    async CreateAndPublishPostSpecial(context) {
        await this.ClearAndTypePost(context,this.postTitleSpecial,this.postContentSpecial);
        await this.PublishPost(context);
    }

    async SeeSpecialPostPublished(context) {
        await context.driver.$(dropdownPostFilter).click();
        await context.driver.$(optionPublishedPost).click();
        await context.driver.pause(delay);
        const postTitle = await context.driver.$(classPublisdPostTitle).getText();
        return await assert.equal(postTitle,this.postTitleSpecial);
    }

    async ClearAndTypePostWithImages(context, postTitle_ = this.postTitle, postContent_ = this.postContent) {
        await context.driver.$(postTitleInput).click();
        await context.driver.$(postTitleInput).setValue(postTitle_);
        await context.driver.pause(delay);
        await context.driver.$(postContentImageInput).click();
        await context.driver.$(postAddCard).click();
        await context.driver.$(postUnplashCard).click();
        await this.AddUnplashImage(context,imageUnplashContentClass);
        await context.driver.$(postContentImageInput).click();
        await context.driver.$(postContentImageInput).setValue(postContent_);
        await context.driver.pause(delay);
    }

    async AddUnplashImage(context, class_ = imageUnplashClass) {
        await context.driver.$(class_).click();
        await context.driver.pause(delay);
    }

    async CreateAndPublishPostWithImages(context) {
        await context.driver.$(imagePostFeatureClass).click();
        await context.driver.pause(delay);
        await this.AddUnplashImage(context);
        await this.ClearAndTypePostWithImages(context);
        await this.PublishPost(context);
    }

    async CreateAndPublishPostWithMultipleLanguages(context) {
        await this.ClearAndTypePost(context,this.postTitleMultilanguage,this.postContentMultilanguage);
        await this.PublishPost(context);
    }

    async SeeMultilanguagePostPublished(context) {
        await context.driver.$(dropdownPostFilter).click();
        await context.driver.$(optionPublishedPost).click();
        await context.driver.pause(delay);
        const postTitle = await context.driver.$(classPublisdPostTitle).getText();
        return await assert.equal(postTitle,this.postTitleMultilanguage);
    }
}

module.exports = new PostPage();