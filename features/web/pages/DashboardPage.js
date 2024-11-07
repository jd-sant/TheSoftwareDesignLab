// const assert = require('assert'); // Por alguna razon esto no funciona aca pero si en step.js

class DashboardPage {

    async thenSeeDashboardOnboarding(this_) { 
        let element = await this_.driver.$('.gh-onboarding-header h2');
        let text = await element.getText();
        return text === 'Let’s get started!';
        // return assert.equal(text, 'Let’s get started!');
    };

}

export const dashboardPage = new DashboardPage();