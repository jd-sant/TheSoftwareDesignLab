import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

describe('Tag Creation', () => {
    let baseData;
    beforeEach(() => {
        cy.fixture('tagSchema.json').then((data) => {
            const randomIndex = Math.floor(Math.random() * data.length);
            baseData = data[randomIndex]; // Asignar los datos a la variable baseData
        });
        
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to tag page
        givenSteps.givenNavigateToTagPage();
    });

    it('PA0#-C - Create a tag with meta data and unplash image', () => {
        // When the user creates a Tag
        whenSteps.whenCreateTagWithUnplashImageAndMetaData(baseData); 
        // Then the user should see the tag created
        thenSteps.thenSeeTagCreatedwithUnplashImageAndMetaData(baseData);
    });
    

    it('PA0#-C - Create a tag with x data and title emojis', () => {
        // When the user creates a Tag with x data
        whenSteps.whenCreateTagWithXcard(baseData); 
        // Then the user should see an alert with error twitter
        thenSteps.thenSeeTagAlertErrorWithXData(baseData);
    });
    
    

});
