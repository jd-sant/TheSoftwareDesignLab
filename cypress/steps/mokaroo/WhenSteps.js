import { memberPage } from "../../pages/mokaroo/MemberPage";
import { postPage } from "../../pages/mokaroo/PostPage";
class WhenSteps {

    // Members
    whenCreateAndSaveMember(baseData) {
        memberPage.CreateAndSaveMember(baseData);
    }    

    whenCreateEmptyNameMember(baseData) {
        memberPage.CreateEmptyNameMember(baseData);
    }

    whenCreateMemberInvalidEmail(baseData) {
        memberPage.CreateMemberInvalidEmail(baseData);
    }
    
    whenCreateMemberInvalidDotsEmail(baseData) {
        memberPage.CreateMemberInvalidDotsEmail(baseData);
    }

    whenCreateMemberOverflowName(baseData) {
        memberPage.CreateMemberOverflowName(baseData);
    }

    whenCreateMemberOverflowLabel(baseData) {
        memberPage.CreateMemberOverflowLabel(baseData);
    }

    whenCreateMemberOverflowNote(baseData) {
        memberPage.CreateMemberOverflowNote(baseData);
    }

    whenCreateMemberExistingEmail(baseData, baseData2) {
        memberPage.CreateMemberExistingEmail(baseData, baseData2);
    }

    whenEditAndSaveMember(baseData, baseData2) {
        memberPage.EditAndSaveMember(baseData, baseData2);
    }

    whenDeleteMember(baseData) {
        memberPage.DeleteMember(baseData);
    }

    // Post
    whenCreateAndPublishPost(baseData) {
        postPage.CreateAndPublishPost(baseData.postTitle, baseData.postContent);
    }

    whenCreateAndPublishPostSpecial(baseData) {
        postPage.CreateAndPublishPostSpecial(baseData);
    }

    whenCreateAndPublishPostWithTitleOnly(baseData) {
        postPage.CreateAndPublishPostWithTitleOnly(baseData);
    }

    whenCreateAndPublishPostWithImages(baseData) {
        postPage.CreateAndPublishPostWithImages(baseData);
    }

    whenCreateAndPublishPostWithMultipleLanguages(baseData) {
        postPage.CreateAndPublishPostWithMultipleLanguages(baseData);
    }

}

export const whenSteps = new WhenSteps();