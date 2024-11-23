import { memberPage } from "../../pages/mokaroo/MemberPage";
import { postPage } from "../../pages/mokaroo/PostPage";
class WhenSteps {

    whenCreateAndSaveMember(baseData){
        memberPage.CreateAndSaveMember(baseData);
    }

    whenCreateAndPublishPost(baseData){
        postPage.CreateAndPublishPost(baseData.postTitle, baseData.postContent);
    }

    whenCreateAndPublishPostSpecial(baseData){
        postPage.CreateAndPublishPostSpecial(baseData);
    }

    whenCreateAndPublishPostWithTitleOnly(baseData){    
        postPage.CreateAndPublishPostWithTitleOnly(baseData);
    }

    whenCreateAndPublishPostWithImages(baseData){
        postPage.CreateAndPublishPostWithImages(baseData);
    }

    whenCreateAndPublishPostWithMultipleLanguages(baseData){
        postPage.CreateAndPublishPostWithMultipleLanguages(baseData);
    }

}

export const whenSteps = new WhenSteps();