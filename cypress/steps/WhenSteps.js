import { loginPage } from "../pages/LoginPage";
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
    
    whenCreateUser(){
        loginPage.CreateUser();
    }

    whenBadLogin(){
        loginPage.BadLogin();
    }

    whenBadEmailLogin(){
        loginPage.BadEmailLogin();
    }
}

export const whenSteps = new WhenSteps();