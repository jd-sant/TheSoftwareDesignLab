import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

describe('Create User', () => {
    beforeEach(() => {
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
    });
    
    it('PA001-C - Create admin user', () => {
        // When the user fills the form to create a new user
        whenSteps.whenCreateUser();
        // Then the user should change site description
        thenSteps.thenCanChangeSiteDescription();
    });

    // it.skip('PA002-C - Bad password login with the new user', () => {
    //     // When the user tries to login with a bad password
    //     whenSteps.whenBadLogin();
    //     // Then the user should see a message error
    //     thenSteps.thenSeeLoginError();
    // });

    // it.skip('PA003-K - Bad email login with the new user', () => {
    //     // When the user tries to login with a bad email
    //     whenSteps.whenBadEmailLogin();
    //     // Then the user should be a message error
    //     thenSteps.thenSeeLoginEmailError();
    // });
});