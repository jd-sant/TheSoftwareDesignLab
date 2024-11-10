import { loginPage } from "../pages/LoginPage";
import { postPage } from "../pages/PostPage";
import { memberPage } from "../pages/MemberPage";
import { tagPage } from "../pages/TagPage";
import {pagePage} from "../pages/PagePage";

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

    whenCreateTagWithAllFieldsBlank(){
        tagPage.CreateTagWitAllFieldsBlank();
    }

    whenCreateAndEditTag(){
        tagPage.CreateTagAndEdit();
    }

    whenCreateEditAndCancelTag(){
        tagPage.CreateTagEditAndCancel();
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

    whenCreateUser(){
        loginPage.CreateUser();
    }

    whenBadLogin(){
        loginPage.BadLogin();
    }

    whenCreateAndPublishPage(){
        pagePage.CreateAndPublishPage();
    }
        
    whenCreateAndPublishPageSpecial(){
        pagePage.CreateAndPublishPageSpecial();
    }
        
    whenCreatePageInvalidTitle(){
        pagePage.CreatePageInvalidTitle();
    }
        
    whenCreateAndPublishFeaturePage(){
        pagePage.CreateAndPublishFeaturePage();
    }
}

export const whenSteps = new WhenSteps();