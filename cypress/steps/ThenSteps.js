import { postPage } from "../pages/PostPage";

class ThenSteps {

    thenSeePostPublished(){
        postPage.SeePostPublished();
    }
    
    thenSeeSpecialPostPublished(){
        postPage.SeeSpecialPostPublished();
    }
}

export const thenSteps = new ThenSteps();