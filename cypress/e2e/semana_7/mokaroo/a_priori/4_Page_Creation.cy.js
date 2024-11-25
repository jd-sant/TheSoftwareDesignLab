import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Page Creation Input Tests', () => {
    let baseData;
    beforeEach(() => {
        cy.fixture('pageSchema.json').then((data) => {
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
        givenSteps.givenNavigateToPagePage(); 
    });

    it('PA071-C - Create a page with title only', () => {
        // When the user creates and publishes the page with title only
        whenSteps.whenCreateAndPublishPageWithTitleOnly(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA072-C - Create a normal page', () => {
        // When the user creates and publishes the page
        whenSteps.whenCreateAndPublishPage(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA073-C - Create a page with special characters', () => {
        // When the user creates and publishes the page with special characters
        whenSteps.whenCreateAndPublishPageSpecial(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeSpecialPagePublished(baseData);
    });
    
    it('PA074-C- Create a post with multiple languages', () => {
        // When the user creates and publishes the page with multiple languages
        whenSteps.whenCreateAndPublishPageWithMultipleLanguages(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeMultilanguagePagePublished(baseData);
    });

    it('PA075-C - Create a page with emoji title', () => {
        // When the user creates and publishes the page with emoji title
        whenSteps.whenCreateAndPublishPageWithEmojis(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA076-C - Create a page with symbol title', () => {
        // When the user creates and publishes the page with symbol title
        whenSteps.whenCreateAndPublishPageWithSymbols(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA077-C - Create a page with content only', () => {
        // When the user creates and publishes the page with content only
        whenSteps.whenCreateAndPublishPageWithContentOnly(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA078-C - Create a page with title 256 characters', () => {
        // When the user creates and publishes the page with a title with 256 characters
        whenSteps.whenCreateAndPublishLongTitlePage(baseData); 
        // Then the user should see a publish error
        thenSteps.thenPageLongTitlePublishError(baseData);
    });

    it('PA079-C - Create a page and change the url', () => {
        // When the user creates and publishes the page and changes the URL
        whenSteps.whenCreateAndPublishPageURL(baseData); 
        // Then the user should see the page in the new URL
        thenSteps.thenSeePagePublishedURL(baseData);
    });

    it('PA080-C - Create a page with a 301 character excerpt', () => {
        // When the user creates and publishes the page with a excerpt of 301 characters
        whenSteps.whenCreateAndPublishPageExcerpt(baseData); 
        // Then the user should be the page published
        thenSteps.thenPageLongExcerptPublishError(baseData);
    });

});
