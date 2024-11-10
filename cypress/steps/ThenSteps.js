import { postPage } from "../pages/PostPage";
import { memberPage } from "../pages/MemberPage";

class ThenSteps {

    thenSeePostPublished(){
        postPage.SeePostPublished();
    }
    
    thenSeeSpecialPostPublished(){
        postPage.SeeSpecialPostPublished();
    }

    thenSeeMultilanguagePostPublished(){
        postPage.SeeMultilanguagePostPublished();
    }

    thenSeeMemberCreated(){
        memberPage.SeeMemberCreated();
    }
}

export const thenSteps = new ThenSteps();