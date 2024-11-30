import { givenSteps } from '../steps/GivenSteps';
import { whenSteps } from '../steps/WhenSteps';
import { thenSteps } from '../steps/ThenSteps';

describe('Private site Feature Testing', () => {
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
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
    });

    it('PA0##-C - Privatizate the site', () => {
        // When the user privatizate the site
        whenSteps.whenPrivatizateSite(baseData);
        // Then the user should see the site privatizated
        thenSteps.thenAccessSiteWithPassword(baseData);
    });
})