import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

describe('Member Creation (pseudo-aleatorio)', () => {
  let mockData;
  let shuffledData;
  let baseData1_1, baseData1_2, baseData1_3;
  let baseData2_1, baseData2_2, baseData2_3;
  let baseData3_1, baseData3_2, baseData3_3;
  let baseData4_1, baseData4_2, baseData4_3;
  let baseData5_1, baseData5_2, baseData5_3;
  let baseData6_1, baseData6_2, baseData6_3;
  let baseData7_1, baseData7_2, baseData7_3;

  beforeEach(() => {
    // Realizar la petición a la API de Mockaroo para obtener 1000 registros
    cy.request({
      method: 'GET',
      url: 'https://my.api.mockaroo.com/members_schema?key=81257b00',
    }).then((response) => {
      // Asegurarse de que la respuesta sea exitosa
      expect(response.status).to.eq(200);
      mockData = response.body; // Asignamos la respuesta a la variable mockData      
      shuffledData = mockData.sort(() => 0.5 - Math.random());
      [
      baseData1_1, baseData1_2, baseData1_3,
      baseData2_1, baseData2_2, baseData2_3,
      baseData3_1, baseData3_2, baseData3_3,
      baseData4_1, baseData4_2, baseData4_3,
      baseData5_1, baseData5_2, baseData5_3,
      baseData6_1, baseData6_2, baseData6_3,
      baseData7_1, baseData7_2, baseData7_3
      ] = shuffledData.slice(0, 21);
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

  it('PA####-C - Create a member and find by Label (condition: is)', () => {
    // When the user creates and saves members and try to find it by label
    whenSteps.whenCreateMemberFindByLabelIs(baseData1_1, baseData1_2, baseData1_3);
    // Then the user should see the created member by the label
    thenSteps.thenSeeMembersCreatedByLabelIs(baseData1_1, baseData1_2, baseData1_3);
  });

  it('PA####-C - Create a member and find by Label (condition: is not)', () => {
    // When the user creates and saves members and filter by some different label with a 'is not' condition
    whenSteps.whenCreateMemberFindByLabelIsNot(baseData2_1, baseData2_2, baseData2_3);
    // Then the user should see the created members by the diferent filter label with a 'is not' condition
    thenSteps.thenSeeMembersCreatedByLabelIsNot(baseData2_1, baseData2_2, baseData2_3);
  });

  it('PA####-C - Create a member and find by name (condition: is)', () => {
    // When the user creates and saves members and try to find it by name
    whenSteps.whenCreateMemberFindByNameIs(baseData3_1, baseData3_2, baseData3_3);
    // Then the user should see the created member by the name
    thenSteps.thenSeeMembersCreatedByNameIs(baseData3_1, baseData3_2, baseData3_3);
  });

  it('PA####-C - Create a member and find by name (condition: contains)', () => {
    // When the user creates and saves members and try to find it by name with contains condition
    whenSteps.whenCreateMemberFindByNameContains(baseData4_1, baseData4_2, baseData4_3);
    // Then the user should see the created member by the name with contains condition
    thenSteps.thenSeeMembersCreatedByNameContains(baseData4_1, baseData4_2, baseData4_3);
  });

  it('PA####-C - Create a member and find by name (condition: does not contain)', () => {
    // When the user creates and saves members and try to find it by name with not contain condition
    whenSteps.whenCreateMemberFindByNameNotContains(baseData5_1, baseData5_2, baseData5_3);
    // Then the user should see the created member by the name with not contain condition
    thenSteps.thenSeeMembersCreatedByNameNotContains(baseData5_1, baseData5_2, baseData5_3);
  });

  it('PA####-C - Create a member and find by name (condition: starts with)', () => {
    // When the user creates and saves members and try to find it by name with starts with condition
    whenSteps.whenCreateMemberFindByNameStartsWith(baseData6_1, baseData6_2, baseData6_3);
    // Then the user should see the created member by the name with starts with condition
    thenSteps.thenSeeMembersCreatedByNameStartsWith(baseData6_1, baseData6_2, baseData6_3);
  });

  it('PA####-C - Create a member and find by name (condition: ends with)', () => {
    // When the user creates and saves members and try to find it by name with ends with condition
    whenSteps.whenCreateMemberFindByNameEndsWith(baseData7_1, baseData7_2, baseData7_3);
    // Then the user should see the created member by the name with ends with condition
    thenSteps.thenSeeMembersCreatedByNameEndsWith(baseData7_1, baseData7_2, baseData7_3);
  });

  
});