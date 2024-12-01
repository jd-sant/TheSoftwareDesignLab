import { memberPage } from "../pages/MemberPage";
import { postPage } from "../pages/PostPage";
import { settingsPage } from "../pages/SettingsPage";
import { tagPage } from "../pages/TagPage";
import { pagePage } from "../pages/PagePage";

class ThenSteps {

// Members
    thenSeeMemberCreated(baseData){
        memberPage.SeeMemberCreated(baseData);
    }

    thenSeeMembersCreatedByLabelIs(baseData, baseData2, baseData3){
        memberPage.SeeMembersCreatedByLabelIs(baseData, baseData2, baseData3);
    }

    thenSeeMembersCreatedByLabelIsNot(baseData, baseData2, baseData3){
        memberPage.SeeMembersCreatedByLabelIsNot(baseData, baseData2, baseData3);
    }

    thenSeeMembersCreatedByNameIs(baseData, baseData2, baseData3){
        memberPage.SeeMembersCreatedByNameIs(baseData, baseData2, baseData3);
    }

    thenSeeMembersCreatedByNameContains(baseData, baseData2, baseData3){
        memberPage.SeeMembersCreatedByNameContains(baseData, baseData2, baseData3);
    }

    thenSeeMembersCreatedByNameNotContains(baseData, baseData2, baseData3){
        memberPage.SeeMembersCreatedByNameNotContains(baseData, baseData2, baseData3);
    }

    thenSeeMembersCreatedByNameStartsWith(baseData, baseData2, baseData3){
        memberPage.SeeMembersCreatedByNameStartsWith(baseData, baseData2, baseData3);
    }

    thenSeeMembersCreatedByNameEndsWith(baseData, baseData2, baseData3){
        memberPage.SeeMembersCreatedByNameEndsWith(baseData, baseData2, baseData3);
    }

    thenSeeBlankLabelError(baseData){
        memberPage.SeeBlankLabelError(baseData);
    }

    thenSeeWithoutLettersNameError(baseData){
        memberPage.SeeWithoutLettersNameError(baseData);
    }

    thenSeeAccentsEmailError(baseData){
        memberPage.SeeAccentsEmailError(baseData);
    }

    thenSeeEmDashErrorOnEmailDomain(baseData){
        memberPage.SeeEmDashErrorOnEmailDomain(baseData);
    }

    thenSeeMemberCreatedWithEmptyName(baseData){
        memberPage.SeeMemberCreatedWithEmptyName(baseData);
    }

    thenSeeFormError(baseData){
        memberPage.SeeFormError(baseData);
    }

    thenSeeFormDotsEmailError(baseData){
        memberPage.SeeFormDotsEmailError(baseData);
    }

    thenSeeFormNameError(baseData){
        memberPage.SeeFormNameError(baseData);
    } 

    thenSeeFormLabelError(baseData){
        memberPage.SeeFormLabelError(baseData);
    }

    thenSeeFormNoteError(baseData){
        memberPage.SeeFormNoteError(baseData);
    }    

    thenSeeExistingEmailError(baseData, baseData2){
        memberPage.SeeExistingEmailError(baseData, baseData2);
    }

    thenSeeMemberEdited(baseData, baseData2){
        memberPage.SeeMemberEdited(baseData, baseData2);
    }

    thenNotSeeMemberDeleted(baseData){
        memberPage.NotSeeMemberDeleted(baseData);
    }

    // tag
    thenSeeTagCreated(baseData){
        tagPage.wrapSeeTagCreated(baseData);
    }

    thenSeeTags(){
        tagPage.seeTagsLeavePage();
    }

    thenSeeTagEdit(baseDataEdit){
        tagPage.wrapSeeTagEdited(baseDataEdit);
    }

    thenSeeTagEditCancel(baseData){
        tagPage.wrapSeeTagsLeavePageCancel(baseData);
    }

    thenSeeTagNotCreate(){
        tagPage.seeTagNotCreate('nameTag');
    }

    thenSeeTagNotCreateForColor(){
        tagPage.seeTagNotCreate('colorTag');
    }

    thenSeeTagNotCreateForDescription(){
        tagPage.seeTagNotCreate('descriptionTag');
    }

    thenSeeTagNotCreateForSlug(){
        tagPage.seeTagNotCreate('slugTag');
    }

    thenNotSeeTagAgain(baseData){
        tagPage.notSeeTagDelete(baseData);
    }

    thenSeeTagWithMetaData(baseData){
        tagPage.seeTagWithMetaData(baseData)
    }

    thenSeeTagCreatedwithUnplashImageAndMetaData(baseData){
        tagPage.seeImageUnplash(baseData);
    }

    thenSeeTagAlertErrorWithXData(baseData){
        tagPage.seeAlertErrorX(baseData);
    }

    thenSeeTagLinkToPost(baseData) {
        tagPage.seeTagLinkToPost(baseData);
    }

    // General Settings

    thenSeeSiteTimezoneChanged(baseData){
        settingsPage.seeChangeTimezone(baseData)
    }

    thenChangePublicationLanguage () {
        settingsPage.seeChangePublicationLanguage()
    }

    thenSeeChangeMetaDataWithwithoutlastCharacter(baseData){
        settingsPage.seeChangeMetaDataWithwithoutlastCharacter(baseData)
    }


// Posts
    thenSeePostPublished(baseData){
        postPage.SeePostPublished(baseData.postTitle);
    }

    thenSeeSpecialPostPublished(baseData){
        postPage.SeeSpecialPostPublished(baseData);
    }

    thenSeeMultilanguagePostPublished(baseData){
        postPage.SeeMultilanguagePostPublished(baseData);
    }

    thenPublishButtonUnavailable(){
        postPage.PublishButtonUnavailable();
    }

    thenPostLongTitlePublishError(){
        postPage.PostLongTitlePublishError();
    }

    thenSeePostPublishedURL(baseData){
        postPage.SeePostPublishedURL(baseData);
    }

    thenCantPublishExistingPost(baseData){
        postPage.CantPublishExistingPost(baseData);
    }

    thenUpdatedButtonEnable(){
        postPage.UpdatedButtonEnable();
    }

    // Create Page

    thenSeePagePublished(baseData){
        pagePage.SeePagePublished(baseData.pageTitle);
    }

    thenSeeSpecialPagePublished(baseData){
        pagePage.SeeSpecialPagePublished(baseData);
    }

    thenSeeMultilanguagePagePublished(baseData){
        pagePage.SeeMultilanguagePagePublished(baseData);
    }

    thenPublishButtonUnavailable(){
        pagePage.PublishButtonUnavailable();
    }

    thenLongTitleUpdateError(){
        pagePage.LongTitleUpdateError();
    }

    thenSeePagePublishedURL(baseData){
        pagePage.SeePagePublishedURL(baseData);
    }

    thenPageLongExcerptPublishError(){
        pagePage.PageLongExcerptPublishError();
    }

    thenSeeEmptyPagePublished(){
        pagePage.SeeEmptyPagePublished();
    }

    thenSeeOlderPagePublished(baseData){
        pagePage.SeeOlderPagePublished(baseData.pageTitle);
    }

    thenUpdateButtonNotActive(){
        pagePage.UpdateButtonNotActive();
    }

    thenPageLongTitlePublishError(){
        pagePage.PageLongTitlePublishError();
    }

    // Admin User
    thenCanChangeSiteDescription(baseData){
        settingsPage.CanChangeSiteDescription(baseData);
    }

    // Setting page
    thenAccessSiteWithPassword(baseData){
        settingsPage.AccessSiteWithPassword(baseData);
    }

}

export const thenSteps = new ThenSteps();