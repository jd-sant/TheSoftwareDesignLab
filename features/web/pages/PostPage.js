const { faker } = require('@faker-js/faker');
const delay = 2000;
const postTitleInput = 'textarea[data-test-editor-title-input]';

class PostPage {

    postTitle = faker.lorem.words(3);
    postContent = faker.lorem.paragraphs(4,'\n');

    async UserFillPostTitle(context,type) {
        let element = await context.driver.$(postTitleInput);
        switch(type) {
            case 'normal':
                await element.setValue(faker.lorem.words(3));
            default:
                await element.setValue(type);
        }
        await context.driver.pause(delay);
    }

    async UserFillPostContent(context,type) {
        let element = await context.driver.$(postContentInput);
        switch(type) {
            case 'normal':
                await element.setValue(faker.lorem.paragraphs(4,'\n'));
            default:
                await element.setValue(type);
        }
        await context.driver.pause(delay);
    }

    async ClearAndTypePost(context,type) {
        this.UserFillPostTitle(context,type);
        this.UserFillPostContent(context,type)
    }

    async CreateAndPublishPost(context,type) {
        this.ClearAndTypePost(context,type);
    }

}

module.exports = new PostPage();