import { givenSteps } from '../steps/GivenSteps';
import { whenSteps } from '../steps/WhenSteps';
import { thenSteps } from '../steps/ThenSteps';

describe('Member Creation', () => {
    beforeEach(() => {
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to member page
        givenSteps.givenNavigateToMemberPage();
    });

    it('PA010-C - Create a member', () => {
        // When the user creates and save a member
        whenSteps.whenCreateAndSaveMember();
        // Then the user should see the member created
        thenSteps.thenSeeMemberCreated();
    });

    it('PA011-C - Create a member with an invalid email', () => {
        // When the user creates and try to save a member with a invalid email
        whenSteps.whenCreateMemberInvalidEmail();
        // Then the user should see an error on the input email
        thenSteps.thenSeeFormError();
    });

    it('PA012-C - Create a member with an existing email', () => {
        // When the user creates and save a member with an existing email
        whenSteps.whenCreateMemberExistingEmail();
        // Then the user should see an error on the input email
        thenSteps.thenSeeExistingEmailError();
    });

});
