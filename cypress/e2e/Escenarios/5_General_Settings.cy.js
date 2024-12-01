import { givenSteps } from '../../steps/GivenSteps';
import { whenSteps } from '../../steps/WhenSteps';
import { thenSteps } from '../../steps/ThenSteps';

describe('Tag Creation', () => {
    let baseData;
    beforeEach(() => {
        cy.fixture('generalSettings.json').then((data) => {
            const randomIndex = Math.floor(Math.random() * data.length);
            baseData = data[randomIndex]; // Asignar los datos a la variable baseData
        });
        
        // Given the user has navigated to the Ghost site
        givenSteps.givenNavigateToTheSite();
        // And the user has logged in Ghost
        givenSteps.givenUserIsLogin();
        // And the user has navigated to tag page
        givenSteps.givenNavigateToSettingsPage();
    });

    it('PA148-C - Change site timezone', () => {
        // When the user change site timezone
        whenSteps.whenChangeSiteTimezone(baseData); 
        // Then the user should see that timezone change
        thenSteps.thenSeeSiteTimezoneChanged(baseData);
    });

    it('PA149-C - Change languaje to spanish', () => {
        // When the user change site timezone
        whenSteps.whenChangePublicationLanguage(); 
        // Then the user should see that timezone change
        thenSteps.thenChangePublicationLanguage();
    });
    
    it('PA150-C - Change languaje to spanish', () => {
        // When the user change site timezone
        whenSteps.whenChangeMetaData(baseData); 
        // Then the user should see that timezone change
        thenSteps.thenSeeChangeMetaDataWithwithoutlastCharacter(baseData);
    });

});
