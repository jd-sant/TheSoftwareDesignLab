import { memberPage } from "../../pages/mokaroo/MemberPage";
import { postPage } from "../../pages/mokaroo/PostPage";

class ThenSteps {

// Members
    thenSeeMemberCreated(baseData){
        memberPage.SeeMemberCreated(baseData);
    }

    thenSeeFormError(baseData){
        memberPage.SeeFormError(baseData);
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


}

export const thenSteps = new ThenSteps();