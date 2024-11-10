import { loginPage } from "../pages/LoginPage";
import { postPage } from "../pages/PostPage";
import { memberPage } from "../pages/MemberPage";
import { tagPage } from "../pages/TagPage";

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

    whenCreateTag(){
        tagPage.CreateTag();
    }

    whenCreateAndSaveMember(){
        memberPage.CreateAndSaveMember();
    }

    whenCreateMemberInvalidEmail(){
        memberPage.CreateMemberInvalidEmail();
    }   

    whenCreateMemberExistingEmail(){
        memberPage.CreateMemberExistingEmail();
    }   
    
    whenEditAndSaveMember(){
        memberPage.EditAndSaveMember();
    }

    whenDeleteMember(){
        memberPage.DeleteMember();
    }

    whenCreateUser(){
        loginPage.CreateUser();
    }

    whenBadLogin(){
        loginPage.BadLogin();
    }
}

export const whenSteps = new WhenSteps();