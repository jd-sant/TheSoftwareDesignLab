import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Tag Creation', () => {
    let baseData;
    let baseDataEdit;
    beforeEach(() => {
        cy.fixture('tagSchema.json').then((data) => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomIndexEdit = Math.floor(Math.random() * data.length);
            baseData = data[randomIndex]; // Asignar los datos a la variable baseData
            baseDataEdit = data[randomIndexEdit]; // Asignar los datos a la variable baseDataEdit
        });
        
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to tag page
        givenSteps.givenNavigateToTagPage();
    });

    it('PA051-C - Create a tag', () => {
        // When the user creates a Tag
        whenSteps.whenCreateTag(baseData); 
        // Then the user should see the tag created
        thenSteps.thenSeeTagCreated(baseData);
    }); 

    it('PA052-C - Create a tag with all fields left blank', () => {
        // When the user creates a Tag with all fields blank
        whenSteps.whenCreateTagWithAllFieldsBlank(); 
        // Then the user should see that the tag was not created
        thenSteps.thenSeeTags();
    }); 

    it('PA053-C - Edit a tag with all fields filled', () => {
        // When the user edits the tag with all fields filled
        whenSteps.whenCreateAndEditTag(baseData, baseDataEdit); 
        // Then the user should see that the tag edited
        thenSteps.thenSeeTagEdit(baseDataEdit);
    }); 

    it('PA054-C - Edit a tag with all fields filled and cancel edit', () => {
        // When the user edits the tag with all fields filled and cancels the edit
        whenSteps.whenCreateEditAndCancelTag(baseData, baseDataEdit); 
        // Then the user should see that the tag remains unchanged
        thenSteps.thenSeeTagEditCancel(baseData);
    }); 

    it('PA055-C - Create a tag with 192 characters in field name', () => {
        // When the user try to create a tag with 192 characters in name
        whenSteps.whenCreateTagLongCharacters(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreate(baseData);
    }); 

    it('PA056-C - Create a tag with invalid color', () => {
        // When the user try to create a tag with invalid color
        whenSteps.whenCreateTagColorInvalid(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForColor();
    }); 

    it('PA057-C - Create a tag with 501 characters in field description', () => {
        // When the user try to create a tag with 501 characters in description
        whenSteps.whenCreateTagLongDescription(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForDescription();
    }); 

    it('PA058-C - Create a tag with 192 characters in slug (url)', () => {
        // When the user try to create a tag with 1921 characters in slug
        whenSteps.whenCreateTagLongSlug(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForSlug();
    });

    it('PA059-C - Delete a tag created', () => {
        // When the user delete a tag created
        whenSteps.whenDeleteTag(baseData); 
        // Then the user should not see the tag
        thenSteps.thenNotSeeTagAgain(baseData);
    });

    it('PA060-C - Create Tag with Meta data', () => {
        // When the user create a tag with metada
        whenSteps.whenCreateTagWithMetaData(baseData); 
        // Then the user should see the tag with title and description meta data
        thenSteps.thenSeeTagWithMetaData(baseData);
    });

});
