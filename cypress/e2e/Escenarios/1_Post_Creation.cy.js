import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

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

    it('PA042-C - Create a post with title only', () => {
        // When the user creates and publishes the post with title only
        whenSteps.whenCreateAndPublishPostWithTitleOnly(baseData); 
        // Then the user should see the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA043-C - Create a normal post', () => {
        // When the user creates and publishes the post
        whenSteps.whenCreateAndPublishPost(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA044-C - Create a post with special characters', () => {
        // When the user creates and publishes the post with special characters
        whenSteps.whenCreateAndPublishPostSpecial(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeeSpecialPostPublished(baseData);
    });
    
    it('PA045-C - Create a post with Unplash images', () => {
        // When the user creates and publishes the post with images from Unplash
        whenSteps.whenCreateAndPublishPostWithImages(baseData); 
        // Then the user should see the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA046-C - Create a post with multiple languages', () => {
        // When the user creates and publishes the post with multiple languages
        whenSteps.whenCreateAndPublishPostWithMultipleLanguages(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeeMultilanguagePostPublished(baseData);
    });

    it('PA047-C - Create a post with emojis as title', () => {
        // When the user creates and publishes the post with emojis as title
        whenSteps.whenCreateAndPublishPostWithEmojis(baseData); 
        // Then the user should be the post published
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA048C - Create a post with symbols as title', () => {
        // When the user creates and publishes the post with symbols as title
        whenSteps.whenCreateAndPublishPostWithSymbols(baseData); 
        // Then the user should be the post published
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA049-C - Create a post 256 characters as title', () => {
        // When the user creates and publishes the post with 256 characters as title
        whenSteps.whenCreateAndPublishLongTitlePost(baseData); 
        // Then the user should be the post published
        thenSteps.thenPostLongTitlePublishError();
    });

    it('PA050-C - Create a post and change the url', () => {
        // When the user creates and publishes the post
        whenSteps.whenCreateAndPublishPostURL(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeePostPublishedURL(baseData);
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
        // Then the user shouldn't be able to publish the same post again
        thenSteps.thenCantPublishExistingPost(baseData);
    });

    it('PA0##-C - Update post published date', () => {
        // When a user edit a post and update the published date
        whenSteps.whenUpdatePostPublishedDate();
        // Then the user should see the updated button enable
        thenSteps.thenUpdatedButtonEnable();
    });

    it('PA0##-C - Creat a post with a emoji as url', () => {
        // When the user creates a post with a emoji as url
        whenSteps.whenCreateAndPublishPostURLEmoji(baseData);
        // Then the user shouldn't be able to publish the post
        thenSteps.thenCantPublishExistingPost(baseData);
    });
});
