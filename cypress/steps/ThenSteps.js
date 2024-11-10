import { dashboardPage } from "../pages/DashboardPage";
import { postPage } from "../pages/PostPage";
import { memberPage } from "../pages/MemberPage";
import { loginPage } from "../pages/LoginPage";

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

    thenSeeMemberEdited(){
        memberPage.SeeMemberCreated();
    }

    thenSeeFormError(){
        memberPage.SeeFormError();
    }

    thenSeeExistingEmailError(){
        memberPage.SeeExistingEmailError();
    }
    
    thenSeeDashboard(){
        dashboardPage.SeeDashboard();
    }

    thenSeeLoginError(){
        loginPage.SeeLoginError();
    }
}

export const thenSteps = new ThenSteps();