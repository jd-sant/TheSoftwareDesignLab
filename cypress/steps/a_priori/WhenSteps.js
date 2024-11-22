import { memberPage } from "../../pages/a_priori/MemberPage";
class WhenSteps {

    whenCreateAndSaveMember(baseData){
        memberPage.CreateAndSaveMember(baseData);
    }

}

export const whenSteps = new WhenSteps();