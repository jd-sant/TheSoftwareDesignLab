import { memberPage } from "../../pages/mokaroo/MemberPage";


class ThenSteps {

    thenSeeMemberCreated(baseData){
        memberPage.SeeMemberCreated(baseData);
    }

}

export const thenSteps = new ThenSteps();