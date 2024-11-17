import { givenSteps } from '../../steps/base_version/GivenSteps';
import { whenSteps } from '../../steps/base_version/WhenSteps';
import { thenSteps } from '../../steps/base_version/ThenSteps';

describe('Tags tests', () => {
    beforeEach(() => {
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to tag page
        givenSteps.givenNavigateToTagPage(); 
    });

    it('PA008-C - Create a tag', () => {
        // When the user creates a Tag
        whenSteps.whenCreateTag(); 
        // Then the user should see the tag created
        thenSteps.thenSeeTagCreated();
    });

/*     it('PA009-C - Create a tag with all fields left blank', () => {
        // When the user creates a Tag with all fields blank
        whenSteps.whenCreateTagWithAllFieldsBlank(); 
        // Then the user should see that the tag was not created
        thenSteps.thenSeeTags();
    });

    it('PA010-C - Edit a tag with all fields filled', () => {
        // When the user edits the tag with all fields filled
        whenSteps.whenCreateAndEditTag(); 
        // Then the user should see that the tag edited
        thenSteps.thenSeeTagEdit();
    });

    it('PA011-C - Edit a tag with all fields filled and cancel edit', () => {
        // When the user edits the tag with all fields filled and cancels the edit
        whenSteps.whenCreateEditAndCancelTag(); 
        // Then the user should see that the tag remains unchanged
        thenSteps.thenSeeTagEditCancel();
    }); */
   
});
