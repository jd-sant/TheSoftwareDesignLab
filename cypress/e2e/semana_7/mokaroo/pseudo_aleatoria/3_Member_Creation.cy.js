import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Member Creation (pseudo-aleatorio)', () => {
  let mockData;
  let baseData;
    beforeEach(() => {
      // Realizar la petición a la API de Mockaroo para obtener 1000 registros
      cy.request({
        method: 'GET',
        url: 'https://my.api.mockaroo.com/memberPositive?key=9f987470',
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
      // And the user has logged in Ghost
      givenSteps.givenUserIsLogin();
      // And the user has navigated to member page
      givenSteps.givenNavigateToMemberPage();
    });

    it('PA012-C - Create a member (pseudo-aleatorio)', () => {
        // When the user creates and saves a member
        whenSteps.whenCreateAndSaveMember(baseData);
        // Then the user should see the created member
        thenSteps.thenSeeMemberCreated(baseData);
    });

});