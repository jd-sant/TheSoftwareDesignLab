import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Tag Creation', () => {
    let baseData;
    let mockData;
    let baseDataEdit;
    beforeEach(() => {
        // Realizar la petición a la API de Mockaroo para obtener 100 registros
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/tagSchema?key=fdba97f0',
        }).then((response) => {
            // Asegurarse de que la respuesta sea exitosa
            expect(response.status).to.eq(200);
            mockData = response.body; // Asignamos la respuesta a la variable mockData
            const randomIndex = Math.floor(Math.random() * mockData.length);
            baseData = mockData[randomIndex];
        });

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/tagSchema?key=fdba97f0',
        }).then((response) => {
            // Asegurarse de que la respuesta sea exitosa
            expect(response.status).to.eq(200);
            mockData = response.body; // Asignamos la respuesta a la variable mockData
            const randomIndex = Math.floor(Math.random() * mockData.length);
            baseDataEdit = mockData[randomIndex];
        });
        
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to tag page
        givenSteps.givenNavigateToTagPage();
    });

    it('PA091-C - Create a tag', () => {
        // When the user creates a Tag
        whenSteps.whenCreateTag(baseData); 
        // Then the user should see the tag created
        thenSteps.thenSeeTagCreated(baseData);
    });

    it('PA092-C - Create a tag with all fields left blank', () => {
        // When the user creates a Tag with all fields blank
        whenSteps.whenCreateTagWithAllFieldsBlank(); 
        // Then the user should see that the tag was not created
        thenSteps.thenSeeTags();
    }); 

    it('PA093-C - Edit a tag with all fields filled', () => {
        // When the user edits the tag with all fields filled
        whenSteps.whenCreateAndEditTag(baseData, baseDataEdit); 
        // Then the user should see that the tag edited
        thenSteps.thenSeeTagEdit(baseDataEdit);
    }); 

    it('PA094-C - Edit a tag with all fields filled and cancel edit', () => {
        // When the user edits the tag with all fields filled and cancels the edit
        whenSteps.whenCreateEditAndCancelTag(baseData, baseDataEdit); 
        // Then the user should see that the tag remains unchanged
        thenSteps.thenSeeTagEditCancel(baseData);
    }); 

    it('PA095-C - Create a tag with 192 characters in field name', () => {
        // When the user try to create a tag with 192 characters in name
        whenSteps.whenCreateTagLongCharacters(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreate(baseData);
    }); 

    it('PA096-C - Create a tag with invalid color', () => {
        // When the user try to create a tag with invalid color
        whenSteps.whenCreateTagColorInvalid(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForColor();
    }); 

    it('PA097-C - Create a tag with 501 characters in field description', () => {
        // When the user try to create a tag with 501 characters in description
        whenSteps.whenCreateTagLongDescription(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForDescription();
    }); 

    it('PA098-C - Create a tag with 192 characters in slug (url)', () => {
        // When the user try to create a tag with 1921 characters in slug
        whenSteps.whenCreateTagLongSlug(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForSlug();
    });

    it('PA099-C - Delete a tag created', () => {
        // When the user delete a tag created
        whenSteps.whenDeleteTag(baseData); 
        // Then the user should not see the tag
        thenSteps.thenNotSeeTagAgain(baseData);
    });

    it('PA100-C - Create Tag with Meta data', () => {
        // When the user create a tag with metada
        whenSteps.whenCreateTagWithMetaData(baseData); 
        // Then the user should see the tag with title and description meta data
        thenSteps.thenSeeTagWithMetaData(baseData);
    });

});
