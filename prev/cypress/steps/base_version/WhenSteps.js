import { loginPage } from "../../pages/base_version/LoginPage";
import { postPage } from "../../pages/base_version/PostPage";
import { memberPage } from "../../pages/base_version/MemberPage";
import { tagPage } from "../../pages/base_version/TagPage";
import {pagePage} from "../../pages/base_version/PagePage";

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

    whenBadEmailLogin(){
        loginPage.BadEmailLogin();
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