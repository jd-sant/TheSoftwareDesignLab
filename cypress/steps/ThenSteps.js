import { dashboardPage } from "../pages/DashboardPage";
import { postPage } from "../pages/PostPage";
import { tagPage } from "../pages/TagPage";
import { memberPage } from "../pages/MemberPage";
import { loginPage } from "../pages/LoginPage";
import { pagePage } from "../pages/PagePage";
import { settingsPage } from "../pages/SettingsPage";


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

    thenSeeTags(){
        tagPage.seeTagsLeavePage();
    }

    thenSeeTagEdit(){
        tagPage.SeeTagEdited();
    }

    thenSeeTagEditCancel(){
        tagPage.seeTagsLeavePageCancel();
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

    thenSeeMemberEdited(){
        memberPage.SeeMemberEdited();
    }

    thenNotSeeMemberDeleted(){
        memberPage.NotSeeMemberDeleted();
    }
    
    thenSeeDashboard(){
        dashboardPage.SeeDashboard();
    }

    thenSeeLoginError(){
        loginPage.SeeLoginError();
    }

    thenSeeLoginEmailError(){
        loginPage.SeeLoginEmailError();
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

    thenCanChangeSiteDescription(){
        settingsPage.CanChangeSiteDescription();
    }

}

export const thenSteps = new ThenSteps();