import { givenSteps } from '../../steps/base_version/GivenSteps';
import { whenSteps } from '../../steps/base_version/WhenSteps';
import { thenSteps } from '../../steps/base_version/ThenSteps';

describe('Post Creation', () => {
    beforeEach(() => {
        Cypress.Screenshot.defaults({
            disableTimersAndAnimations: false,
          })
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to post page
        givenSteps.givenNavigateToPostPage(); 
    });

    it('PA004-C - Create a normal post', () => {
        // When the user creates and publishes the post
        whenSteps.whenCreateAndPublishPost(); 
        // Then the user should be the post published
        thenSteps.thenSeePostPublished();
    });

});
