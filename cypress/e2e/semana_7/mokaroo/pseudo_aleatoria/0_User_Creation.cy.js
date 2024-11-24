import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Create User', () => {
    let baseData;
    let mockData;
    beforeEach(() => {
        // Realizar la petición a la API de Mockaroo para obtener 1000 registros
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/siteDescription?key=9f987470',
        }).then((response) => {
            // Asegurarse de que la respuesta sea exitosa
            expect(response.status).to.eq(200);
            mockData = response.body; // Asignamos la respuesta a la variable mockData
            const randomIndex = Math.floor(Math.random() * mockData.length);
            baseData = mockData[randomIndex];
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