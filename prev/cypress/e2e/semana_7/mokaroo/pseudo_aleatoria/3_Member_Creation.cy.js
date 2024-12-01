import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Member Creation (pseudo-aleatorio)', () => {
  let mockData;
  let baseData;
  let baseData2;
  beforeEach(() => {
    // Realizar la petición a la API de Mockaroo para obtener 1000 registros
    cy.request({
      method: 'GET',
      url: 'https://my.api.mockaroo.com/members_schema?key=81257b00',
    }).then((response) => {
      // Asegurarse de que la respuesta sea exitosa
      expect(response.status).to.eq(200);
      mockData = response.body; // Asignamos la respuesta a la variable mockData
      const randomIndex = Math.floor(Math.random() * mockData.length);
      const randomIndex2 = Math.floor(Math.random() * mockData.length);
      baseData = mockData[randomIndex];
      baseData2 = mockData[randomIndex2];
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

  it('PA101-C - Create a member (pseudo-aleatorio)', () => {
    // When the user creates and saves a member
    whenSteps.whenCreateAndSaveMember(baseData);
    // Then the user should see the created member
    thenSteps.thenSeeMemberCreated(baseData);
  });

  it('PA102-C - Create a member with an invalid email (pseudo-aleatorio)', () => {
    // When the user creates and tries to save a member with a invalid email
    whenSteps.whenCreateMemberInvalidEmail(baseData);
    // Then the user should see an error on the input email
    thenSteps.thenSeeFormError(baseData);
  });

  it('PA103-C - Create a member with empty name (pseudo-aleatorio)', () => {
    // When the user creates and tries to save a member with empty name
    whenSteps.whenCreateEmptyNameMember(baseData);
    // Then the user should see the created member by the email
    thenSteps.thenSeeMemberCreatedWithEmptyName(baseData);
  });

  it('PA104-C - Create a member with multiple dots in email (pseudo-aleatorio)', () => {
    // When the user creates and tries to save a member with a multiple dots in email
    whenSteps.whenCreateMemberInvalidDotsEmail(baseData);
    // Then the user should see an error on the input email
    thenSteps.thenSeeFormDotsEmailError(baseData);
  });

  it('PA105-C - Create a member with an overflow name (pseudo-aleatorio)', () => {
    // When the user creates and tries to save a member with an overflow name
    whenSteps.whenCreateMemberOverflowName(baseData);
    // Then the user should see an error on the textarea name
    thenSteps.thenSeeFormNameError(baseData);
  });

  it('PA106-C - Create a member with overflow label (pseudo-aleatorio)', () => {
    // When the user creates and tries to save a member with overflow label
    whenSteps.whenCreateMemberOverflowLabel(baseData);
    // Then the user should see an error on the input label
    thenSteps.thenSeeFormLabelError(baseData);
  });

  it('PA107-C - Create a member with an overflow note (pseudo-aleatorio)', () => {
    // When the user creates and tries to save a member with an overflow note
    whenSteps.whenCreateMemberOverflowNote(baseData);
    // Then the user should see an error on the textarea note
    thenSteps.thenSeeFormNoteError(baseData);
  });

  it('PA108-C - Create a member with an existing email (pseudo-aleatorio)', () => {
    // When the user creates and tries to save a member with an existing email
    whenSteps.whenCreateMemberExistingEmail(baseData, baseData2);
    // Then the user should see an existence error on the input email
    thenSteps.thenSeeExistingEmailError(baseData, baseData2);
  });

  it('PA109-C - Edit a member (pseudo-aleatorio)', () => {
    // When the user edits and save a member
    whenSteps.whenEditAndSaveMember(baseData, baseData2);
    // Then the user should see the member edited
    thenSteps.thenSeeMemberEdited(baseData2);
  });

  it('PA110-C - Delete a member (pseudo-aleatorio)', () => {
    // When the user deletes a member
    whenSteps.whenDeleteMember(baseData);
    // Then the user should not see the member deleted
    thenSteps.thenNotSeeMemberDeleted(baseData);
  });

});