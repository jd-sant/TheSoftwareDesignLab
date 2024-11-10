import { givenSteps } from '../steps/GivenSteps';
import { whenSteps } from '../steps/WhenSteps';
import { thenSteps } from '../steps/ThenSteps';

describe('Tags tests', () => {
    beforeEach(() => {
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to tag page
        givenSteps.givenNavigateToTagPage(); 
    });

    it('PA010-C - Create a tag', () => {
        // When the user creates a Tag
        whenSteps.whenCreateTag(); 
        // Then the user should see the tag created
        thenSteps.thenSeeTagCreated();
    });

   
});
