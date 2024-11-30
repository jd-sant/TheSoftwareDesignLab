import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

describe('Page Creation Tests', () => {
    let baseData;
    let mockData;
    beforeEach(() => {
        // Realizar la petición a la API para obtener 1000 registros
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/page_schema.json?key=f8e5d4b0',
        }).then((response) => {
            // Asegurarse de que la respuesta sea exitosa
            expect(response.status).to.eq(200);
            mockData = response.body; // Asignamos la respuesta a la variable mockData
            const randomIndex = Math.floor(Math.random() * mockData.length);
            baseData = mockData[randomIndex];
        });
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to page page
        givenSteps.givenNavigateToPagePage(); 
    });

    it.skip('PA030-C - Create an empty page', () => {
        // When the user creates and publishes the page with title only
        whenSteps.whenCreateEmptyPage(baseData); 
        // Then the user should see the page published
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it.skip('PA031-C - Create a normal page and change the title to 256 characters', () => {
        // When the user creates and publishes the page
        whenSteps.whenCreateAndEditPageLongTitle(baseData); 
        // Then the user should see the page published
        thenSteps.thenLongTitleUpdateError(baseData);
    });

    it.skip('PA032-C - Create a normal page and erase the content to publish an empty page', () => {
        // When the user creates and publishes the page with special characters
        whenSteps.whenCreateAndEditEmptyPage(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeEmptyPagePublished(baseData);
    });
    
    it.skip('PA033-C - Create duplicated pages', () => {
        // When the user creates and publishes the page with multiple languages
        whenSteps.whenCreateDuplicatedPages(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it.skip('PA034-C - Create a page and change the url to another alphabet', () => {
        // When the user creates and publishes the page with emoji title
        whenSteps.whenCreateAndPublishPageURLMultilanguage(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it.skip('PA035-C - Create a page with an older date', () => {
        // When the user creates and publishes the page with symbol title
        whenSteps.whenCreateAndPublishPageWithOlderDate(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenSeePagePublished(baseData);
    });

    it.skip('PA036-C - Create a normal page with special characters in the URL', () => {
        // When the user creates and publishes the page with content only
        whenSteps.whenCreateAndPublishPageWithContentOnly(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it.skip('PA037-C - Create a normal page with emojis in the URL', () => {
        // When the user creates and publishes the page with a title with 256 characters
        whenSteps.whenCreateAndPublishLongTitlePage(baseData); 
        // Then the user should see a publish error
        thenSteps.thenPageLongTitlePublishError(baseData);
    });

    it.skip('PA038-C - Create a page and change the url to a normal string', () => {
        // When the user creates and publishes the page and changes the URL
        whenSteps.whenCreateAndPublishPageURL(baseData); 
        // Then the user should see the page in the new URL
        thenSteps.thenSeePagePublishedURL(baseData);
    });

    it.skip('PA039-C - Create a normal page and try to put the same URL to another page', () => {
        // When the user creates and publishes the page with a excerpt of 301 characters
        whenSteps.whenCreateAndPublishPageExcerpt(baseData); 
        // Then the user should be the page published
        thenSteps.thenPageLongExcerptPublishError(baseData);
    });

});
