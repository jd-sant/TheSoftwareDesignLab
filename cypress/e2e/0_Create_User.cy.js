import { givenSteps } from '../steps/GivenSteps';
import { whenSteps } from '../steps/WhenSteps';
import { thenSteps } from '../steps/ThenSteps';

describe('Create User', () => {
    beforeEach(() => {
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
    });
    
    it('PA001-C - Create admin user', () => {
        // When the user fills the form to create a new user
        whenSteps.whenCreateUser();
        // Then the user should see the dashboard
        thenSteps.thenSeeDashboard();
    });

    it('PA002-C - Bad password login with the new user', () => {
        // When the user tries to login with a bad password
        whenSteps.whenBadLogin();
        // Then the user should be a message error
        thenSteps.thenSeeLoginError();
    });
});