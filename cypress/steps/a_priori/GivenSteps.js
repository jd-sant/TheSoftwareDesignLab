import { dashboardPage } from "../../pages/a_priori/DashboardPage";
import { loginPage } from "../../pages/a_priori/LoginPage";

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