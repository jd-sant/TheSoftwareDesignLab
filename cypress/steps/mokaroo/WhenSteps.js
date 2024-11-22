import { memberPage } from "../../pages/mokaroo/MemberPage";
class WhenSteps {

    whenCreateAndSaveMember(baseData){
        memberPage.CreateAndSaveMember(baseData);
    }

}

export const whenSteps = new WhenSteps();