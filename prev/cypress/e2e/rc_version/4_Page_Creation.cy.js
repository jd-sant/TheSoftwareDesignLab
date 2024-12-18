import { givenSteps } from '../../steps/rc_version/GivenSteps';
import { whenSteps } from '../../steps/rc_version/WhenSteps';
import { thenSteps } from '../../steps/rc_version/ThenSteps';

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

    it('PA018-C - Create a page with special characters', () => {
        // When the user creates and publishes the page with special characters
        whenSteps.whenCreateAndPublishPageSpecial(); 
        // Then the user should see the page published
        thenSteps.thenSeeSpecialPagePublished();
    });

    it('PA019-C - Create a page with an invalid long title', () => {
        // When the user creates and publishes the page with a title over 255 characters
        whenSteps.whenCreatePageInvalidTitle(); 
        // Then the user should see an error in the publishing
        thenSteps.thenLongTitlePublishError();
    });

    it('PA020-C - Create a page featured', () => {
        // When the user creates and publishes the page feature
        whenSteps.whenCreateAndPublishFeaturePage(); 
        // Then the user should see the publishing in the feature filter
        thenSteps.thenSeeFeaturePagePublished();
    });
});