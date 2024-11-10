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

    givenNavigateToMemberPage(){
        dashboardPage.NavigateToMemberPage();
    }
    
}

export const givenSteps = new GivenSteps();