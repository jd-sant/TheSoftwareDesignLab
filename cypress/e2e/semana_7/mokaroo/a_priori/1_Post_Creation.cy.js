import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Post Creation', () => {
    let baseData;
    beforeEach(() => {
        cy.fixture('postSchema.json').then((data) => {
            const randomIndex = Math.floor(Math.random() * data.length);
            baseData = data[randomIndex]; // Asignar los datos a la variable baseData
        });
        Cypress.Screenshot.defaults({
            disableTimersAndAnimations: false,
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
});
