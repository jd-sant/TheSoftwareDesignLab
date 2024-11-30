import { memberPage } from "../pages/MemberPage";
import { postPage } from "../pages/PostPage";
import { loginPage } from "../pages/LoginPage";
import { tagPage } from "../pages/TagPage";
import { pagePage } from "../pages/PagePage";
import { settingsPage } from "../pages/SettingsPage";

class WhenSteps {

    // Members
    whenCreateAndSaveMember(baseData) {
        memberPage.CreateAndSaveMember(baseData);
    }    

    whenCreateMemberFindByLabelIs(baseData, baseData2, baseData3) {
        memberPage.CreateMemberFindByLabelIs(baseData, baseData2, baseData3);
    }

    whenCreateMemberFindByLabelIsNot(baseData, baseData2, baseData3) {
        memberPage.CreateMemberFindByLabelIsNot(baseData, baseData2, baseData3);
    }

    whenCreateMemberFindByNameIs(baseData, baseData2, baseData3) {
        memberPage.CreateMemberFindByNameIs(baseData, baseData2, baseData3);
    }

    whenCreateMemberFindByNameContains(baseData, baseData2, baseData3) {
        memberPage.CreateMemberFindByNameContains(baseData, baseData2, baseData3);
    }

    whenCreateMemberFindByNameNotContains(baseData, baseData2, baseData3) {
        memberPage.CreateMemberFindByNameNotContains(baseData, baseData2, baseData3);
    }

    whenCreateMemberFindByNameStartsWith(baseData, baseData2, baseData3) {
        memberPage.CreateMemberFindByNameStartsWith(baseData, baseData2, baseData3);
    }

    whenCreateMemberFindByNameEndsWith(baseData, baseData2, baseData3) {
        memberPage.CreateMemberFindByNameEndsWith(baseData, baseData2, baseData3);
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

    whenCreateTagWithUnplashImageAndMetaData(baseData){
        tagPage.createTagWithUnplashImageAndMetaData(baseData);
    }

    whenCreateTagWithXcard(baseData) {
        tagPage.createInvalidTagXData(baseData);
    }

    whenLinkTagToPost(baseData) {
        tagPage.createTagAndLinkPost(baseData)
    }

    // General Settings

    whenChangeSiteTimezone(baseData){
        settingsPage.changeSiteTimezone(baseData)
    }

    whenChangePublicationLanguage() {
        settingsPage.changePublicationLanguage()
    }

    whenChangeMetaData(baseData){
        settingsPage.changeMetaData(baseData);
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

    whenCreateEmptyPost(baseData) {
        postPage.CreateEmptyPost(baseData);
    }
    
    // Create Page

    whenCreateAndPublishPage(baseData){
        pagePage.CreateAndPublishPage(baseData.pageTitle, baseData.pageContent);
    }

    whenCreateAndPublishPageWithTitleOnly(baseData){
        pagePage.CreateAndPublishPageWithTitleOnly(baseData)
    }

    whenCreateAndPublishPageSpecial(baseData) {
        pagePage.CreateAndPublishPageSpecial(baseData);
    }

    whenCreateAndPublishPageWithMultipleLanguages(baseData) {
        pagePage.CreateAndPublishPageWithMultipleLanguages(baseData);
    }

    whenCreateAndPublishPageWithEmojis(baseData) {
        pagePage.CreateAndPublishPageWithEmojis(baseData);
    }

    whenCreateAndPublishPageWithSymbols(baseData) {
        pagePage.CreateAndPublishPageWithSymbols(baseData);
    }

    whenCreateAndPublishPageWithContentOnly(baseData){
        pagePage.CreateAndPublishPageWithContentOnly(baseData);
    }

    whenCreateAndPublishLongTitlePage(baseData) {
        pagePage.CreateAndPublishLongTitlePage(baseData);
    }

    whenCreateAndPublishPageURL(baseData) {
        pagePage.CreateAndPublishPageURL(baseData);
    }

    whenCreateAndPublishPageExcerpt(baseData) {
        pagePage.CreateAndPublishPageExcerpt(baseData);
    }

    // Admin user
    whenCreateUser(){
        loginPage.CreateUser();
    }
}

export const whenSteps = new WhenSteps();