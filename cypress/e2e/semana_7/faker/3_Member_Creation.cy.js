import { givenSteps } from '../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../steps/mokaroo/ThenSteps';
import { faker } from '@faker-js/faker';
describe('Member Creation', () => {
    let baseData;
    let baseData2;
    beforeEach(() => {
        baseData = {
            memberName: faker.person.fullName(),
            memberEmail: faker.internet.email(),
            memberDotsEmail: faker.internet.email() + ".col.co.kl",
            memberLabel: faker.lorem.words(1).toUpperCase(),
            memberNote: faker.lorem.words(3),
            memberNoteLong: faker.lorem.words(200).substring(0, 501),
            naughtyString: faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample(),
        };
        baseData2 = {
            memberName: faker.person.fullName(),
            memberEmail: faker.internet.email(),
            memberDotsEmail: faker.internet.email() + ".col.co.kl",
            memberLabel: faker.lorem.words(1).toUpperCase(),
            memberNote: faker.lorem.words(3),
            memberNoteLong: faker.lorem.words(200).substring(0, 501),
            naughtyString: faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample(),
        };
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

    it('PA021-C - Create a member (a-priori)', () => {
        // When the user creates and saves a member
        whenSteps.whenCreateAndSaveMember(baseData);
        // Then the user should see the created member
        thenSteps.thenSeeMemberCreated(baseData);
    });

    it('PA022-C - Create a member with an invalid email (a-priori)', () => {
        // When the user creates and tries to save a member with a invalid email
        whenSteps.whenCreateMemberInvalidEmail(baseData);
        // Then the user should see an error on the input email
        thenSteps.thenSeeFormError(baseData);
    });

    it('PA023-C - Create a member with empty name (a-priori)', () => {
        // When the user creates and tries to save a member with empty name
        whenSteps.whenCreateEmptyNameMember(baseData);
        // Then the user should see the created member by the email
        thenSteps.thenSeeMemberCreatedWithEmptyName(baseData);
    });

    it('PA024-C - Create a member with multiple dots in email (a-priori)', () => {
        // When the user creates and tries to save a member with a multiple dots in email
        whenSteps.whenCreateMemberInvalidDotsEmail(baseData);
        // Then the user should see an error on the input email
        thenSteps.thenSeeFormDotsEmailError(baseData);
    });

    it('PA025-C - Create a member with an overflow name (a-priori)', () => {
        // When the user creates and tries to save a member with an overflow name
        whenSteps.whenCreateMemberOverflowName(baseData);
        // Then the user should see an error on the textarea name
        thenSteps.thenSeeFormNameError(baseData);
    });

    it('PA026-C - Create a member with overflow label (a-priori)', () => {
        // When the user creates and tries to save a member with overflow label
        whenSteps.whenCreateMemberOverflowLabel(baseData);
        // Then the user should see an error on the input label
        thenSteps.thenSeeFormLabelError(baseData);
    });

    it('PA027-C - Create a member with an overflow note (a-priori)', () => {
        // When the user creates and tries to save a member with an overflow note
        whenSteps.whenCreateMemberOverflowNote(baseData);
        // Then the user should see an error on the textarea note
        thenSteps.thenSeeFormNoteError(baseData);
    });

    it('PA028-C - Create a member with an existing email (a-priori)', () => {
        // When the user creates and tries to save a member with an existing email
        whenSteps.whenCreateMemberExistingEmail(baseData, baseData2);
        // Then the user should see an existence error on the input email
        thenSteps.thenSeeExistingEmailError(baseData, baseData2);
    });

    it('PA029-C - Edit a member (a-priori)', () => {
        // When the user edits and save a member
        whenSteps.whenEditAndSaveMember(baseData, baseData2);
        // Then the user should see the member edited
        thenSteps.thenSeeMemberEdited(baseData2);
    });

    it('PA030-C - Delete a member (a-priori)', () => {
        // When the user deletes a member
        whenSteps.whenDeleteMember(baseData);
        // Then the user should not see the member deleted
        thenSteps.thenNotSeeMemberDeleted(baseData);
    });
});
