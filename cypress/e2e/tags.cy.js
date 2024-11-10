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

    it('PA011-C - Create a tag with all fields left blank', () => {
        // When the user creates a Tag with all fields blank
        whenSteps.whenCreateTagWithAllFieldsBlank(); 
        // Then the user should see that the tag was not created
        thenSteps.thenSeeTags();
    });

    it('PA012-C - Edit a tag with all fields filled', () => {
        // When the user edits the tag with all fields filled
        whenSteps.whenCreateAndEditTag(); 
        // Then the user should see that the tag edited
        thenSteps.thenSeeTagEdit();
    });

    it('PA013-C - Edit a tag with all fields filled and cancel edit', () => {
        // When the user edits the tag with all fields filled and cancels the edit
        whenSteps.whenCreateEditAndCancelTag(); 
        // Then the user should see that the tag remains unchanged
        thenSteps.thenSeeTagEditCancel();
    });
   
});
