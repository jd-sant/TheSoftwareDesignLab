import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

describe('Member Creation', () => {
    beforeEach(() => {
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to member page
        givenSteps.givenNavigateToMemberPage();
    });

    it('PA012-C - Create a member', () => {
        // When the user creates and saves a member
        whenSteps.whenCreateAndSaveMember();
        // Then the user should see the created member
        thenSteps.thenSeeMemberCreated();
    });

    it('PA013-C - Create a member with an invalid email', () => {
        // When the user creates and tries to save a member with a invalid email
        whenSteps.whenCreateMemberInvalidEmail();
        // Then the user should see an error on the input email
        thenSteps.thenSeeFormError();
    });

    it('PA014-C - Create a member with an existing email', () => {
        // When the user creates and tries to save a member with an existing email
        whenSteps.whenCreateMemberExistingEmail();
        // Then the user should see an existence error on the input email
        thenSteps.thenSeeExistingEmailError();
    });

    it('PA015-C - Edit a member', () => {
        // When the user edits and save a member
        whenSteps.whenEditAndSaveMember();
        // Then the user should see the member edited
        thenSteps.thenSeeMemberEdited();
    });

    it('PA016-C - Delete a member', () => {
        // When the user deletes a member
        whenSteps.whenDeleteMember();
        // Then the user should not see the member deleted
        thenSteps.thenNotSeeMemberDeleted();
    });

});
