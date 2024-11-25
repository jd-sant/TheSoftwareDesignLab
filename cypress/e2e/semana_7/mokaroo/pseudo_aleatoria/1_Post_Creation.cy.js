import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Post Creation', () => {
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

    it('PA082-C - Create a post with title only', () => {
        // When the user creates and publishes the post with title only
        whenSteps.whenCreateAndPublishPostWithTitleOnly(baseData); 
        // Then the user should see the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA083-C - Create a normal post', () => {
        // When the user creates and publishes the post
        whenSteps.whenCreateAndPublishPost(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA084-C - Create a post with special characters', () => {
        // When the user creates and publishes the post with special characters
        whenSteps.whenCreateAndPublishPostSpecial(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeeSpecialPostPublished(baseData);
    });
    
    it('PA085-C - Create a post with Unplash images', () => {
        // When the user creates and publishes the post with images from Unplash
        whenSteps.whenCreateAndPublishPostWithImages(baseData); 
        // Then the user should see the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA086-C - Create a post with multiple languages', () => {
        // When the user creates and publishes the post with multiple languages
        whenSteps.whenCreateAndPublishPostWithMultipleLanguages(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeeMultilanguagePostPublished(baseData);
    });

    it('PA087-C - Create a post with emojis as title', () => {
        // When the user creates and publishes the post with emojis as title
        whenSteps.whenCreateAndPublishPostWithEmojis(baseData); 
        // Then the user should be the post published
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA088-C - Create a post with symbols as title', () => {
        // When the user creates and publishes the post with symbols as title
        whenSteps.whenCreateAndPublishPostWithSymbols(baseData); 
        // Then the user should be the post published
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA089-C - Create a post 256 characters as title', () => {
        // When the user creates and publishes the post with 256 characters as title
        whenSteps.whenCreateAndPublishLongTitlePost(baseData); 
        // Then the user should be the post published
        thenSteps.thenPostLongTitlePublishError();
    });

    it('PA090-C - Create a post and change the url', () => {
        // When the user creates and publishes the post
        whenSteps.whenCreateAndPublishPostURL(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeePostPublishedURL(baseData);
    });
});
