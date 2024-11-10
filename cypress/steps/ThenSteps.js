import { dashboardPage } from "../pages/DashboardPage";
import { postPage } from "../pages/PostPage";
import { tagPage } from "../pages/TagPage";
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

    thenSeeTagCreated(){
        tagPage.SeeTagCreated();
    }

    thenSeeMemberCreated(){
        memberPage.SeeMemberCreated();
    }
    
    thenSeeDashboard(){
        dashboardPage.SeeDashboard();
    }

    thenSeeLoginError(){
        loginPage.SeeLoginError();
    }
}

export const thenSteps = new ThenSteps();