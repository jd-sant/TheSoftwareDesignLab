import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Create User', () => {
    let baseData;
    beforeEach(() => {
        cy.fixture('siteDescription.json').then((data) => {
            const randomIndex = Math.floor(Math.random() * data.length);
            baseData = data[randomIndex]; // Asignar los datos a la variable baseData
        });
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