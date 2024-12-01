import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

describe('Page Creation & Edit Tests', () => {
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
        // And the user has navigated to page page
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


    it('PA139-C - Create an empty page', () => {
        // When the user creates an empty page
        whenSteps.whenCreateEmptyPage(baseData); 
        // Then the user should not see the page publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA140-C - Create a normal page and change the title to 256 characters', () => {
        // When the user creates and publishes the page and edits the title to 256 characters
        whenSteps.whenCreateAndEditPageLongTitle(baseData); 
        // Then the user should see the error and not page published
        thenSteps.thenLongTitleUpdateError(baseData);
    });

    it('PA141-C - Create a normal page and erase the content to publish an empty page', () => {
        // When the user creates a normal page and erases the content to publish an empty page
        whenSteps.whenCreateAndEditEmptyPage(baseData); 
        // Then the user should see the empty page published
        thenSteps.thenSeeEmptyPagePublished(baseData);
    });
    
    it('PA142-C - Create duplicated pages', () => {
        // When the user creates a duplicated page
        whenSteps.whenCreateDuplicatedPages(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA143-C - Create a page and change the url to another alphabet', () => {
        // When the user creates and publishes the page with a URL in another language
        whenSteps.whenCreateAndPublishPageURLMultilanguage(baseData); 
        // Then the user should see the published page with a translated URL
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA144-C - Create a page with an older date', () => {
        // When the user creates and publishes the page with an older date
        whenSteps.whenCreateAndPublishPageWithOlderDate(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeOlderPagePublished(baseData);
    });

    it('PA145-C - Create a normal page with special characters in the URL', () => {
        // When the user creates a normal page with special characters in the URL
        whenSteps.whenCreateAndPublishPageURLSpecial(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA146-C - Create a normal page with emojis in the URL', () => {
        // When the user creates a normal page with emojis in the URL
        whenSteps.whenCreateAndPublishPageURLSEmojis(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA147-C - Create a page and change the url to a normal string', () => {
        // When the user creates and publishes the page, go to edit and changes the URL to a normal string
        whenSteps.whenCreateAndEditPageURL(baseData); 
        // Then the user can't click button update
        thenSteps.thenUpdateButtonNotActive(baseData);
    });

});
