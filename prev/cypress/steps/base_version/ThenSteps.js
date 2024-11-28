import { dashboardPage } from "../../pages/base_version/DashboardPage";
import { postPage } from "../../pages/base_version/PostPage";
import { tagPage } from "../../pages/base_version/TagPage";
import { memberPage } from "../../pages/base_version/MemberPage";
import { loginPage } from "../../pages/base_version/LoginPage";
import { pagePage } from "../../pages/base_version/PagePage";
import { settingsPage } from "../../pages/base_version/SettingsPage";


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