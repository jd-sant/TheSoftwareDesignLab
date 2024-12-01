import { givenSteps } from '../../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../../steps/mokaroo/ThenSteps';

describe('Member Creation (a-priori)', () => {
  let baseData;
  let baseData2;
  beforeEach(() => {
    cy.fixture('memberPositive.json').then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomIndex2 = Math.floor(Math.random() * data.length);
      baseData = data[randomIndex]; // Asignar los datos a la variable baseData        
      baseData2 = data[randomIndex2]; // Asignar los datos a la variable baseData2
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

  it('PA061-C - Create a member (a-priori)', () => {
    // When the user creates and saves a member
    whenSteps.whenCreateAndSaveMember(baseData);
    // Then the user should see the created member
    thenSteps.thenSeeMemberCreated(baseData);
  });

  it('PA062-C - Create a member with an invalid email (a-priori)', () => {
    // When the user creates and tries to save a member with a invalid email
    whenSteps.whenCreateMemberInvalidEmail(baseData);
    // Then the user should see an error on the input email
    thenSteps.thenSeeFormError(baseData);
  });  

  it('PA063-C - Create a member with empty name (a-priori)', () => {
    // When the user creates and tries to save a member with empty name
    whenSteps.whenCreateEmptyNameMember(baseData);
    // Then the user should see the created member by the email
    thenSteps.thenSeeMemberCreatedWithEmptyName(baseData);
  });

  it('PA064-C - Create a member with multiple dots in email (a-priori)', () => {
    // When the user creates and tries to save a member with a multiple dots in email
    whenSteps.whenCreateMemberInvalidDotsEmail(baseData);
    // Then the user should see an error on the input email
    thenSteps.thenSeeFormDotsEmailError(baseData);
  });

  it('PA065-C - Create a member with an overflow name (a-priori)', () => {
    // When the user creates and tries to save a member with an overflow name
    whenSteps.whenCreateMemberOverflowName(baseData);
    // Then the user should see an error on the textarea name
    thenSteps.thenSeeFormNameError(baseData);
  });

  it('PA066-C - Create a member with overflow label (a-priori)', () => {
    // When the user creates and tries to save a member with overflow label
    whenSteps.whenCreateMemberOverflowLabel(baseData);
    // Then the user should see an error on the input label
    thenSteps.thenSeeFormLabelError(baseData);
  });

  it('PA067-C - Create a member with an overflow note (a-priori)', () => {
    // When the user creates and tries to save a member with an overflow note
    whenSteps.whenCreateMemberOverflowNote(baseData);
    // Then the user should see an error on the textarea note
    thenSteps.thenSeeFormNoteError(baseData);
  });

  it('PA068-C - Create a member with an existing email (a-priori)', () => {
    // When the user creates and tries to save a member with an existing email
    whenSteps.whenCreateMemberExistingEmail(baseData, baseData2);
    // Then the user should see an existence error on the input email
    thenSteps.thenSeeExistingEmailError(baseData, baseData2);
  });

  it('PA069-C - Edit a member (a-priori)', () => {
    // When the user edits and save a member
    whenSteps.whenEditAndSaveMember(baseData, baseData2);
    // Then the user should see the member edited
    thenSteps.thenSeeMemberEdited(baseData2);
  });

  it('PA070-C - Delete a member (a-priori)', () => {
    // When the user deletes a member
    whenSteps.whenDeleteMember(baseData);
    // Then the user should not see the member deleted
    thenSteps.thenNotSeeMemberDeleted(baseData);
  });

});