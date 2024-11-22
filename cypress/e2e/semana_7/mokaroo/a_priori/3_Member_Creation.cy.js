import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Member Creation (a-priori)', () => {
  let baseData;
    beforeEach(() => {
      cy.fixture('memberPositive.json').then((data) => {
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
      // And the user has navigated to member page
      givenSteps.givenNavigateToMemberPage();
    });

    it('PA012-C - Create a member (a-priori)', () => {
        // When the user creates and saves a member
        whenSteps.whenCreateAndSaveMember(baseData);
        // Then the user should see the created member
        thenSteps.thenSeeMemberCreated(baseData);
    });

});