import { memberPage } from "../../pages/mokaroo/MemberPage";
import { postPage } from "../../pages/mokaroo/PostPage";
import { settingsPage } from "../../pages/mokaroo/SettingsPage";

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

    // Admin User
    thenCanChangeSiteDescription(baseData){
        settingsPage.CanChangeSiteDescription(baseData);
    }
}

export const thenSteps = new ThenSteps();