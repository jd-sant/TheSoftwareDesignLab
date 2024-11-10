import { dashboardPage } from "../pages/DashboardPage";
import { postPage } from "../pages/PostPage";
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

    thenSeeDashboard(){
        dashboardPage.SeeDashboard();
    }

    thenSeeLoginError(){
        loginPage.SeeLoginError();
    }
}

export const thenSteps = new ThenSteps();