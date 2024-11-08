import { givenSteps } from '../steps/GivenSteps';
import { whenSteps } from '../steps/WhenSteps';
import { thenSteps } from '../steps/ThenSteps';

describe('Post Creation', () => {
    beforeEach(() => {
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

    it('PA005-C - Create a post with special characters', () => {
        // When the user creates and publishes the post with special characters
        whenSteps.whenCreateAndPublishPostSpecial(); 
        // Then the user should be the post published
        thenSteps.thenSeeSpecialPostPublished();
    });
    
});
