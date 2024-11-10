import { postPage } from "../pages/PostPage";
import { memberPage } from "../pages/MemberPage";

class WhenSteps {

    whenCreateAndPublishPost(){
        postPage.CreateAndPublishPost();
    }
    
    whenCreateAndPublishPostSpecial(){
        postPage.CreateAndPublishPostSpecial();
    }

    whenCreateAndPublishPostWithImages(){
        postPage.CreateAndPublishPostWithImages();
    }

    whenCreateAndPublishPostWithMultipleLanguages(){
        postPage.CreateAndPublishPostWithMultipleLanguages();
    }

    whenCreateAndSaveMember(){
        memberPage.CreateAndSaveMember();
    }
}

export const whenSteps = new WhenSteps();