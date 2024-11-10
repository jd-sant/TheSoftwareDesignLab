import { dashboardPage } from "../pages/DashboardPage";
import { loginPage } from "../pages/LoginPage";

class GivenSteps {

    givenNavigateToTheSite(){
        loginPage.NavigateToTheSite();
    }

    givenUserIsLogin(){
        loginPage.UserIsLogin();
    }

    givenNavigateToPostPage(){
        dashboardPage.NavigateToPostPage();
    }

    givenNavigateToTagPage(){
        dashboardPage.NavigateToTagsPage();
    }

    givenNavigateToMemberPage(){
        dashboardPage.NavigateToMemberPage();
    }
    
}

export const givenSteps = new GivenSteps();