import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Page Creation Input Tests', () => {
    let baseData;
    let mockData;
    beforeEach(() => {
        // Realizar la petición a la API de Mockaroo para obtener 1000 registros
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

    it('PA111-C - Create a page with title only', () => {
        // When the user creates and publishes the page with title only
        whenSteps.whenCreateAndPublishPageWithTitleOnly(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA112-C - Create a normal page', () => {
        // When the user creates and publishes the page
        whenSteps.whenCreateAndPublishPage(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA113-C - Create a page with special characters', () => {
        // When the user creates and publishes the page with special characters
        whenSteps.whenCreateAndPublishPageSpecial(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeSpecialPagePublished(baseData);
    });
    
    it('PA114-C - Create a post with multiple languages', () => {
        // When the user creates and publishes the page with multiple languages
        whenSteps.whenCreateAndPublishPageWithMultipleLanguages(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeMultilanguagePagePublished(baseData);
    });

    it('PA115-C - Create a page with emoji title', () => {
        // When the user creates and publishes the page with emoji title
        whenSteps.whenCreateAndPublishPageWithEmojis(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA116-C - Create a page with symbol title', () => {
        // When the user creates and publishes the page with symbol title
        whenSteps.whenCreateAndPublishPageWithSymbols(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA117-C - Create a page with content only', () => {
        // When the user creates and publishes the page with content only
        whenSteps.whenCreateAndPublishPageWithContentOnly(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA118-C - Create a page with title 256 characters', () => {
        // When the user creates and publishes the page with a title with 256 characters
        whenSteps.whenCreateAndPublishLongTitlePage(baseData); 
        // Then the user should see a publish error
        thenSteps.thenPageLongTitlePublishError(baseData);
    });

    it('PA119-C - Create a page and change the url', () => {
        // When the user creates and publishes the page and changes the URL
        whenSteps.whenCreateAndPublishPageURL(baseData); 
        // Then the user should see the page in the new URL
        thenSteps.thenSeePagePublishedURL(baseData);
    });

    it('PA120-C - Create a page with a 301 character excerpt', () => {
        // When the user creates and publishes the page with a excerpt of 301 characters
        whenSteps.whenCreateAndPublishPageExcerpt(baseData); 
        // Then the user should be the page published
        thenSteps.thenPageLongExcerptPublishError(baseData);
    });

});
