import { memberPage } from "../../pages/mokaroo/MemberPage";
import { postPage } from "../../pages/mokaroo/PostPage";
import { loginPage } from "../../pages/mokaroo/LoginPage";
import { tagPage } from "../../pages/mokaroo/TagPage";

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

    //tag
    whenCreateTag(baseData){
        tagPage.wrapCreateTag(baseData);
    }

    whenCreateTagWithAllFieldsBlank(){
        tagPage.CreateTagWitAllFieldsBlank();
    }

    whenCreateAndEditTag(baseData, baseDataEdit){
        tagPage.CreateTagAndEdit(baseData, baseDataEdit);
    }

    whenCreateEditAndCancelTag(baseData, baseDataEdit){
        tagPage.CreateTagEditAndCancel(baseData, baseDataEdit);
    }

    whenCreateTagLongCharacters(baseData){
        tagPage.CreateTagLongCharacters(baseData)
    }

    whenCreateTagColorInvalid(baseData){
        tagPage.createTagInvalidColor(baseData)
    }

    whenCreateTagLongDescription(baseData){
        tagPage.createTagLongDescription(baseData)
    }

    whenCreateTagLongSlug(baseData){
        tagPage.createTagLongSlug(baseData)
    }

    whenDeleteTag(baseData){
        tagPage.DeleteTag(baseData);
    }

    whenCreateTagWithMetaData(baseData){
        tagPage.createTagWithMetaData(baseData);
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

    whenCreateAndPublishPostWithEmojis(baseData) {
        postPage.CreateAndPublishPostWithEmojis(baseData);
    }

    whenCreateAndPublishPostWithSymbols(baseData) {
        postPage.CreateAndPublishPostWithSymbols(baseData);
    }

    whenCreateAndPublishLongTitlePost(baseData) {
        postPage.CreateAndPublishLongTitlePost(baseData);
    }

    whenCreateAndPublishPostURL(baseData) {
        postPage.CreateAndPublishPostURL(baseData);
    }
    
    // Admin user
    whenCreateUser(){
        loginPage.CreateUser();
    }
}

export const whenSteps = new WhenSteps();