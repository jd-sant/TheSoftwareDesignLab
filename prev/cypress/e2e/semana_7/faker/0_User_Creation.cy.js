import { givenSteps } from '../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../steps/mokaroo/ThenSteps';
import { faker } from '@faker-js/faker';

describe('Create User', () => {
    let baseData;
    beforeEach(() => {
        baseData = {
            siteNameField: faker.string.sample(),
            siteDescriptionField: faker.string.sample(),
        }
        Cypress.Screenshot.defaults({
            disableTimersAndAnimations: false,
        });
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
    });
    
    it('PA001-C - Create admin user', () => {
        // When the user fills the form to create a new user
        whenSteps.whenCreateUser();
        // Then the user should change site description
        thenSteps.thenCanChangeSiteDescription(baseData);
    });
});