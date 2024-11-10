import { postPage } from "../pages/PostPage";

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
}

export const thenSteps = new ThenSteps();