import { dashboardPage } from "../../pages/base_version/DashboardPage";
import { loginPage } from "../../pages/base_version/LoginPage";

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

    givenNavigateToPagePage(){
        dashboardPage.NavigateToPagePage();
    }
    
}

export const givenSteps = new GivenSteps();