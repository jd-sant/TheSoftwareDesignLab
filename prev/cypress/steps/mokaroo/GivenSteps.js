import { dashboardPage } from "../../pages/mokaroo/DashboardPage";
import { loginPage } from "../../pages/mokaroo/LoginPage";

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