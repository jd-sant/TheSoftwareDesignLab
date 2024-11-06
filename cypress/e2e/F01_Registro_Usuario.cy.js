import { homePage } from '../elements/pages/HomePage';
import { registerPage } from '../elements/pages/RegisterPage';
import { dashboardPage } from '../elements/pages/DashboardPage';

describe('Ghost E2E testing', () => {
    it('E001 - Como administrador de la plataforma, quiero crear un usuario para administrar el sitio', () => {
        // Given an user goes to the create admin page
        homePage.givenGoToCreateAdminPage();
    
        // When the user publishes a post
        registerPage.whenUserFormFilled();
    
        // When the user submit the form
        registerPage.whenSubmitRegisterForm();

        // Then should see the dashboard onboarding
        dashboardPage.thenSeeDashboardOnboarding();
    });
});