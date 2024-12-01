import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

describe('Page Creation Tests', () => {
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

    it('PA030-C - Create an empty page', () => {
        // When the user creates an empty page
        whenSteps.whenCreateEmptyPage(baseData); 
        // Then the user should not see the page publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA031-C - Create a normal page and change the title to 256 characters', () => {
        // When the user creates and publishes the page and edits the title to 256 characters
        whenSteps.whenCreateAndEditPageLongTitle(baseData); 
        // Then the user should see the error and not page published
        thenSteps.thenLongTitleUpdateError(baseData);
    });

    it('PA032-C - Create a normal page and erase the content to publish an empty page', () => {
        // When the user creates a normal page and erases the content to publish an empty page
        whenSteps.whenCreateAndEditEmptyPage(baseData); 
        // Then the user should see the empty page published
        thenSteps.thenSeeEmptyPagePublished(baseData);
    });
    
    it('PA033-C - Create duplicated pages', () => {
        // When the user creates a duplicated page
        whenSteps.whenCreateDuplicatedPages(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA034-C - Create a page and change the url to another alphabet', () => {
        // When the user creates and publishes the page with a URL in another language
        whenSteps.whenCreateAndPublishPageURLMultilanguage(baseData); 
        // Then the user should see the published page with a translated URL
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA035-C - Create a page with an older date', () => {
        // When the user creates and publishes the page with an older date
        whenSteps.whenCreateAndPublishPageWithOlderDate(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeOlderPagePublished(baseData);
    });

    it('PA036-C - Create a normal page with special characters in the URL', () => {
        // When the user creates a normal page with special characters in the URL
        whenSteps.whenCreateAndPublishPageURLSpecial(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA037-C - Create a normal page with emojis in the URL', () => {
        // When the user creates a normal page with emojis in the URL
        whenSteps.whenCreateAndPublishPageURLSEmojis(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it('PA038-C - Create a page and change the url to a normal string', () => {
        // When the user creates and publishes the page, go to edit and changes the URL to a normal string
        whenSteps.whenCreateAndPublishPageURL(baseData); 
        // Then the user can't click button update
        thenSteps.thenUpdateButtonNotActive(baseData);
    });

});
