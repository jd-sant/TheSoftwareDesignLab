import { givenSteps } from '../steps/GivenSteps';
import { whenSteps } from '../steps/WhenSteps';
import { thenSteps } from '../steps/ThenSteps';

describe('Post Feature Testing', () => {
    let baseData;
    let mockData;
    beforeEach(() => {
        // Realizar la petición a la API de Mockaroo para obtener 1000 registros
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/postSchema?key=9f987470',
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
        // And the user has navigated to post page
        givenSteps.givenNavigateToPostPage(); 
    });
    
    it('PA0##-C - Create a empty post', () => {
        // When the user creates a empty post
        whenSteps.whenCreateEmptyPost(baseData);
        // Then the user shouldn't see the publish button
        thenSteps.thenPublishButtonUnavailable();
    });

    it('PA0##-C - Create an existing post', () => {
        // When the user creates a post
        whenSteps.whenCreateAndPublishPost(baseData); 
        // Then the user shouldn't ve able to publish the same post again
        thenSteps.thenCantPublishExistingPost(baseData);
    });
});