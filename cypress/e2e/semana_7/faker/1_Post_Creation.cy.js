import { givenSteps } from '../../../steps/mokaroo/GivenSteps';
import { whenSteps } from '../../../steps/mokaroo/WhenSteps';
import { thenSteps } from '../../../steps/mokaroo/ThenSteps';
import { faker } from '@faker-js/faker';
import { fakerHY as fakerArmenian } from '@faker-js/faker';
import { fakerRU as fakerRussian } from '@faker-js/faker';
import { fakerZH_CN as fakerChinese } from '@faker-js/faker';
import { fakerJA as fakerJapanese } from '@faker-js/faker';
import { fakerAR as fakerArabic } from '@faker-js/faker';
describe('Post Creation', () => {
    let baseData;
    beforeEach(() => {
        baseData = {
            postTitle_256 : faker.string.alphanumeric(256),
            postContent : faker.lorem.paragraph(),
            postTitle : faker.string.alphanumeric({ length: { min: 5, max: 254 } }),
            postTitle_special : faker.string.sample(),
            postContent_special : faker.string.hexadecimal() + faker.string.symbol() + faker.string.sample(),
            postTitle_symbols : faker.string.symbol({ min: 5, max: 10 }),
            postTitle_emojis : faker.internet.emoji(),
            postTitle_multilanguage : fakerArmenian.lorem.words(3) + fakerRussian.lorem.words(3) + fakerChinese.lorem.words(3) + fakerJapanese.lorem.words(3) + fakerArabic.lorem.words(3),
            postContent_multilanguage : fakerArmenian.lorem.paragraphs(2,'\n') + fakerRussian.lorem.paragraphs(2,'\n') + fakerChinese.lorem.paragraphs(2,'\n') + fakerJapanese.lorem.paragraphs(2,'\n') + fakerArabic.lorem.paragraphs(2,'\n'),
            postURL : faker.finance.bitcoinAddress(),
        };
        Cypress.Screenshot.defaults({
            disableTimersAndAnimations: false,
        });
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to post page
        givenSteps.givenNavigateToPostPage(); 
    });

    it('PA002-C - Create a post with title only', () => {
        // When the user creates and publishes the post with title only
        whenSteps.whenCreateAndPublishPostWithTitleOnly(baseData); 
        // Then the user should see the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA004-C - Create a normal post', () => {
        // When the user creates and publishes the post
        whenSteps.whenCreateAndPublishPost(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA005-C - Create a post with special characters', () => {
        // When the user creates and publishes the post with special characters
        whenSteps.whenCreateAndPublishPostSpecial(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeeSpecialPostPublished(baseData);
    });
    
    it('PA006-C - Create a post with Unplash images', () => {
        // When the user creates and publishes the post with images from Unplash
        whenSteps.whenCreateAndPublishPostWithImages(baseData); 
        // Then the user should see the post published
        thenSteps.thenSeePostPublished(baseData);
    });

    it('PA007-C - Create a post with multiple languages', () => {
        // When the user creates and publishes the post with multiple languages
        whenSteps.whenCreateAndPublishPostWithMultipleLanguages(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeeMultilanguagePostPublished(baseData);
    });

    it('PA00#-C - Create a post with emojis as title', () => {
        // When the user creates and publishes the post with emojis as title
        whenSteps.whenCreateAndPublishPostWithEmojis(baseData); 
        // Then the user should be the post published
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA00#-C - Create a post with symbols as title', () => {
        // When the user creates and publishes the post with symbols as title
        whenSteps.whenCreateAndPublishPostWithSymbols(baseData); 
        // Then the user should be the post published
        thenSteps.thenPublishButtonUnavailable(baseData);
    });

    it('PA00#-C - Create a post 256 characters as title', () => {
        // When the user creates and publishes the post with 256 characters as title
        whenSteps.whenCreateAndPublishLongTitlePost(baseData); 
        // Then the user should be the post published
        thenSteps.thenPostLongTitlePublishError();
    });

    it('PA00#-C - Create a post and change the url', () => {
        // When the user creates and publishes the post
        whenSteps.whenCreateAndPublishPostURL(baseData); 
        // Then the user should be the post published
        thenSteps.thenSeePostPublishedURL(baseData);
    });
});
