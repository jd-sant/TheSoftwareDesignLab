import { dashboardPage } from "../../pages/mokaroo/DashboardPage";
import { loginPage } from "../../pages/mokaroo/LoginPage";

class GivenSteps {

    givenNavigateToTheSite(){
        loginPage.NavigateToTheSite();
    }

    givenUserIsLogin(){
        loginPage.UserIsLogin();
    }

    givenNavigateToMemberPage(){
        dashboardPage.NavigateToMemberPage();
    }
}

export const givenSteps = new GivenSteps();