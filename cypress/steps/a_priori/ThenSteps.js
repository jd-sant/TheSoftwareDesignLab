import { memberPage } from "../../pages/a_priori/MemberPage";


class ThenSteps {

    thenSeeMemberCreated(baseData){
        memberPage.SeeMemberCreated(baseData);
    }

}

export const thenSteps = new ThenSteps();