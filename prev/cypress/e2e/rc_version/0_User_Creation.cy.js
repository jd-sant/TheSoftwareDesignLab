import { givenSteps } from '../../steps/rc_version/GivenSteps';
import { whenSteps } from '../../steps/rc_version/WhenSteps';
import { thenSteps } from '../../steps/rc_version/ThenSteps';

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
});