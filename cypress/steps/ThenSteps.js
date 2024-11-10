import { dashboardPage } from "../pages/DashboardPage";
import { postPage } from "../pages/PostPage";
import { tagPage } from "../pages/TagPage";
import { memberPage } from "../pages/MemberPage";
import { loginPage } from "../pages/LoginPage";
import {pagePage} from "../pages/PagePage";


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

    thenSeePagePublished(){
        pagePage.SeePagePublished();
    }
        
    thenSeeSpecialPagePublished(){
        pagePage.SeeSpecialPagePublished();
    }
        
    thenLongTitlePublishError(){
        pagePage.LongTitlePublishError();
    }
        
    thenSeeFeaturePagePublished(){
        pagePage.SeeFeaturePagePublished();
    }


}

export const thenSteps = new ThenSteps();