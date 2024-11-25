import { givenSteps } from '../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../steps/mokaroo/ThenSteps';
import { faker } from '@faker-js/faker';

describe('Tag Creation', () => {
    let baseData;
    let baseDataEdit;
    beforeEach(() => {
        // Realizar la petición a la API de Mockaroo para obtener 100 registros
        baseData = {
            tagName: faker.word.adjective(),
            tagColor: faker.color.rgb(),
            tagDescription: faker.lorem.paragraph(),
            tagImage: faker.image.dataUri(),
            tagName192: faker.string.alphanumeric(192),
            tagDescription501: faker.string.alphanumeric(501),
            tagColorInvalid: faker.color.human(),
            tagMetaTitle: faker.string.alphanumeric(300),
            tagMetaDescription: faker.string.alphanumeric(500)
        };

        baseDataEdit = {
            tagName: faker.word.adjective(),
            tagColor: faker.color.rgb(),
            tagDescription: faker.lorem.paragraph(),
            tagImage: faker.image.dataUri(),
            tagName192: faker.string.alphanumeric(192),
            tagDescription501: faker.string.alphanumeric(501),
            tagColorInvalid: faker.color.human(),
            tagMetaTitle: faker.string.alphanumeric(300),
            tagMetaDescription: faker.string.alphanumeric(500)
        };
        
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to tag page
        givenSteps.givenNavigateToTagPage();
    });

    it('PA011-C - Create a tag', () => {
        // When the user creates a Tag
        whenSteps.whenCreateTag(baseData); 
        // Then the user should see the tag created
        thenSteps.thenSeeTagCreated(baseData);
    });

    it('PA012-C - Create a tag with all fields left blank', () => {
        // When the user creates a Tag with all fields blank
        whenSteps.whenCreateTagWithAllFieldsBlank(); 
        // Then the user should see that the tag was not created
        thenSteps.thenSeeTags();
    }); 

    it('PA013-C - Edit a tag with all fields filled', () => {
        // When the user edits the tag with all fields filled
        whenSteps.whenCreateAndEditTag(baseData, baseDataEdit); 
        // Then the user should see that the tag edited
        thenSteps.thenSeeTagEdit(baseDataEdit);
    }); 

    it('PA014-C - Edit a tag with all fields filled and cancel edit', () => {
        // When the user edits the tag with all fields filled and cancels the edit
        whenSteps.whenCreateEditAndCancelTag(baseData, baseDataEdit); 
        // Then the user should see that the tag remains unchanged
        thenSteps.thenSeeTagEditCancel(baseData);
    }); 

    it('PA015-C - Create a tag with 192 characters in field name', () => {
        // When the user try to create a tag with 192 characters in name
        whenSteps.whenCreateTagLongCharacters(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreate(baseData);
    }); 

    it('PA016-C - Create a tag with invalid color', () => {
        // When the user try to create a tag with invalid color
        whenSteps.whenCreateTagColorInvalid(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForColor();
    }); 

    it('PA017-C - Create a tag with 501 characters in field description', () => {
        // When the user try to create a tag with 501 characters in description
        whenSteps.whenCreateTagLongDescription(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForDescription();
    }); 

    it('PA018-C - Create a tag with 192 characters in slug (url)', () => {
        // When the user try to create a tag with 1921 characters in slug
        whenSteps.whenCreateTagLongSlug(baseData); 
        // Then the user should see that the tag not created and show error
        thenSteps.thenSeeTagNotCreateForSlug();
    });

    it('PA019-C - Delete a tag created', () => {
        // When the user delete a tag created
        whenSteps.whenDeleteTag(baseData); 
        // Then the user should not see the tag
        thenSteps.thenNotSeeTagAgain(baseData);
    });

    it('PA020-C - Create Tag with Meta data', () => {
        // When the user create a tag with metada
        whenSteps.whenCreateTagWithMetaData(baseData); 
        // Then the user should see the tag with title and description meta data
        thenSteps.thenSeeTagWithMetaData(baseData);
    });

});
