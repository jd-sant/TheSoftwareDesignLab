import { memberPage } from "../../pages/mokaroo/MemberPage";
import { postPage } from "../../pages/mokaroo/PostPage";

class ThenSteps {

    thenSeeMemberCreated(baseData){
        memberPage.SeeMemberCreated(baseData);
    }

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