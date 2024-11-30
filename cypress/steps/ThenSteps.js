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

    thenPageLongTitlePublishError(){
        pagePage.PageLongTitlePublishError();
    }

    thenSeePagePublishedURL(baseData){
        pagePage.SeePagePublishedURL(baseData);
    }

    thenPageLongExcerptPublishError(){
        pagePage.PageLongExcerptPublishError();
    }

    // Admin User
    thenCanChangeSiteDescription(baseData){
        settingsPage.CanChangeSiteDescription(baseData);
    }

}

export const thenSteps = new ThenSteps();