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

    it('PA002-C - Create a post with title only', () => {
        // When the user creates and publishes the post with title only
        whenSteps.whenCreateAndPublishPostWithTitleOnly(baseData); 
        // Then the user should see the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA004-C - Create a normal post', () => {
        // When the user creates and publishes the post
        whenSteps.whenCreateAndPublishPost(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA005-C - Create a post with special characters', () => {
        // When the user creates and publishes the post with special characters
        whenSteps.whenCreateAndPublishPostSpecial(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeeSpecialPostPublished(baseData);
    });
    
    it('PA006-C - Create a post with Unplash images', () => {
        // When the user creates and publishes the post with images from Unplash
        whenSteps.whenCreateAndPublishPostWithImages(baseData); 
        // Then the user should see the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA007-C - Create a post with multiple languages', () => {
        // When the user creates and publishes the post with multiple languages
        whenSteps.whenCreateAndPublishPostWithMultipleLanguages(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeeMultilanguagePostPublished(baseData);
    });
});
