import { givenSteps } from '../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../steps/mokaroo/ThenSteps';
import { faker } from '@faker-js/faker';
import { fakerHY as fakerArmenian } from '@faker-js/faker';
import { fakerRU as fakerRussian } from '@faker-js/faker';
import { fakerZH_CN as fakerChinese } from '@faker-js/faker';
import { fakerJA as fakerJapanese } from '@faker-js/faker';
import { fakerAR as fakerArabic } from '@faker-js/faker';
describe('Page Creation Input Tests', () => {
    let baseData;
    beforeEach(() => {
        baseData = {
            pageTitle_256 : faker.string.alphanumeric(256),
            pageContent : faker.lorem.paragraph(),
            pageTitle : faker.string.alphanumeric({ length: { min: 5, max: 254 } }),
            pageTitle_Special : faker.string.sample(),
            pageContent_Special : faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample(),
            pageTitle_Symbols : faker.string.symbol({ min: 5, max: 10 }),
            pageTitle_Emojis : faker.internet.emoji(),
            pageTitle_multilanguage : fakerArmenian.lorem.words(3) + fakerRussian.lorem.words(3) + fakerChinese.lorem.words(3) + fakerJapanese.lorem.words(3) + fakerArabic.lorem.words(3),
            pageContent_multilanguage : fakerArmenian.lorem.paragraphs(2,'\n') + fakerRussian.lorem.paragraphs(2,'\n') + fakerChinese.lorem.paragraphs(2,'\n') + fakerJapanese.lorem.paragraphs(2,'\n') + fakerArabic.lorem.paragraphs(2,'\n'),
            pageURL : faker.finance.bitcoinAddress(),
            pageExcerpt : faker.string.alphanumeric(301),
        };
        Cypress.Screenshot.defaults({
            disableTimersAndAnimations: false,
        });
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to page page
        givenSteps.givenNavigateToPagePage(); 
    });

    it.skip('Test1-C - Create a page with title only', () => {
        // When the user creates and publishes the page with title only
        whenSteps.whenCreateAndPublishPageWithTitleOnly(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it.skip('Test2-C - Create a normal page', () => {
        // When the user creates and publishes the page
        whenSteps.whenCreateAndPublishPage(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeePagePublished(baseData);
    });

    it.skip('Test3-C - Create a page with special characters', () => {
        // When the user creates and publishes the page with special characters
        whenSteps.whenCreateAndPublishPageSpecial(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeSpecialPagePublished(baseData);
    });
    
    it.skip('Test4-C - Create a post with multiple languages', () => {
        // When the user creates and publishes the page with multiple languages
        whenSteps.whenCreateAndPublishPageWithMultipleLanguages(baseData); 
        // Then the user should see the page published
        thenSteps.thenSeeMultilanguagePagePublished(baseData);
    });

    it.skip('Test5-C - Create a page with emoji title', () => {
        // When the user creates and publishes the page with emoji title
        whenSteps.whenCreateAndPublishPageWithEmojis(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it.skip('Test6-C - Create a page with symbol title', () => {
        // When the user creates and publishes the page with symbol title
        whenSteps.whenCreateAndPublishPageWithSymbols(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it.skip('Test7-C - Create a page with content only', () => {
        // When the user creates and publishes the page with content only
        whenSteps.whenCreateAndPublishPageWithContentOnly(baseData); 
        // Then the user should not see the publish button
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it.skip('Test8-C - Create a page with title 256 characters', () => {
        // When the user creates and publishes the page with a title with 256 characters
        whenSteps.whenCreateAndPublishLongTitlePage(baseData); 
        // Then the user should see a publish error
        thenSteps.thenPageLongTitlePublishError(baseData);
    });

    it.skip('Test9-C - Create a page and change the url', () => {
        // When the user creates and publishes the page and changes the URL
        whenSteps.whenCreateAndPublishPageURL(baseData); 
        // Then the user should see the page in the new URL
        thenSteps.thenSeePagePublishedURL(baseData);
    });

    it('Test10-C - Create a page with a 301 character excerpt', () => {
        // When the user creates and publishes the page with a excerpt of 301 characters
        whenSteps.whenCreateAndPublishPageExcerpt(baseData); 
        // Then the user should be the page published
        thenSteps.thenPageLongExcerptPublishError(baseData);
    });

});
