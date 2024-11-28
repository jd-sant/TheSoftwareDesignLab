import { givenSteps } from '../../steps/base_version/GivenSteps';
import { whenSteps } from '../../steps/base_version/WhenSteps';
import { thenSteps } from '../../steps/base_version/ThenSteps';

describe('Page Creation', () => {
    beforeEach(() => {
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to page page
        givenSteps.givenNavigateToPagePage(); 
    });

    it('PA017-C - Create a page', () => {
        // When the user creates and publishes the page
        whenSteps.whenCreateAndPublishPage(); 
        // Then the user should be the page published
        thenSteps.thenSeePagePublished();
    });

});
