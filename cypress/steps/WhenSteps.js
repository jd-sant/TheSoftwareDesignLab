import { postPage } from "../pages/PostPage";

class WhenSteps {

    whenCreateAndPublishPost(){
        postPage.CreateAndPublishPost();
    }
    
    whenCreateAndPublishPostSpecial(){
        postPage.CreateAndPublishPostSpecial();
    }
}

export const whenSteps = new WhenSteps();