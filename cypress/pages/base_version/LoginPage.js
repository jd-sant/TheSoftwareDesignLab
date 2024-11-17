const url = Cypress.config('baseUrl') || 'http://localhost:3001';
const siteName = Cypress.env('siteName') || 'Kraken Testing';
const adminName = Cypress.env('adminName') || 'The Kraken';
const adminEmail = Cypress.env('adminEmail') || 'release-the-kraken@uniandes.edu.co';
const adminPass = Cypress.env('adminPass') || 'Kraken1234';
const delay = Cypress.env('delay') || 300;
const createAccountButton = 'section[class="gh-flow-content"] > a[href="#/setup/two/"] > span';
const siteTittle = 'input[id="blog-title"]';
const userName = 'input[id="name"]';
const userEmail = 'input[id="email"]';
const loginPassInput = 'input[id="password"]';
const createUserButton = 'button[class="gh-btn gh-btn-green gh-btn-lg gh-btn-block gh-btn-icon ember-view"]';
const skipButton = '.gh-flow-skip';
const loginIdInput = 'input[name="identification"]';
const loginPassInput_ = 'input[name="password"]';
const loginButton = 'button[class="login gh-btn gh-btn-login gh-btn-block gh-btn-icon js-login-button ember-view"]';
class LoginPage {

    // Contador para los screenshots
    screenshotCounter = 0;
    currentTest = Cypress.currentTest?.title || 'unnamedTest';

    /**
      * Toma un screenshot con un nombre único y ordenado.
      * @param {string} name - Nombre del screenshot.
      */
    takeScreenshot(name) {
        const pathScreenShot = Cypress.currentTest.title
        if (pathScreenShot != this.currentTest){
            this.currentTest = Cypress.currentTest.title
            this.screenshotCounter = 0
            this.datetime = new Date().toISOString().replace(/:/g,".");
        }
        const formattedCounter = String(this.screenshotCounter).padStart(3, '0'); // Formatea el número con ceros iniciales
        const screenshotName = `${formattedCounter}_${name}`;
        // cy.screenshot(`${this.datetime}-${pathScreenShot}/${screenshotName}`);
        cy.screenshot(`${pathScreenShot}/${screenshotName}`);
        this.screenshotCounter++; // Incrementa el contador
        
    }

    NavigateToTheSite() {
        cy.visit(url + '/ghost/#/signin');
        cy.wait(delay);
        this.takeScreenshot('NavigateToTheSite');
    }

    UserIsLogin(email = adminEmail, passwd = adminPass){
        cy.get(loginIdInput).clear();
        cy.get(loginIdInput).type(email);
        this.takeScreenshot('UserLoginTypeEmail');
        cy.get(loginPassInput_).clear();
        cy.get(loginPassInput_).type(passwd);
        this.takeScreenshot('UserLoginTypePass');
        cy.get(loginButton).click();
        cy.wait(delay);
        this.takeScreenshot('UserLoggedIn');
    }

    CreateUser(){
        cy.get(createAccountButton).click();
        cy.get(siteTittle).type(siteName);
        this.takeScreenshot('CreateUserTypeSiteName');
        cy.get(userName).type(adminName);
        this.takeScreenshot('CreateUserTypeAdminName');
        cy.get(userEmail).type(adminEmail);
        this.takeScreenshot('CreateUserTypeAdminEmail');
        cy.get(loginPassInput).type(adminPass);
        this.takeScreenshot('CreateUserTypeAdminPass');
        cy.get(createUserButton).click();
        cy.get(skipButton).click();
        cy.wait(delay);
        this.takeScreenshot('UserCreated');
    }

    BadLogin(){
        this.UserIsLogin(adminEmail,'badPass');
    }

    BadEmailLogin(){
        this.UserIsLogin('jack-sparrow@pirate.org',adminPass);
    }

    SeeLoginError(){
        cy.get(loginErrorButton).should('be.visible');
        cy.get(loginErrorMessage).should('to.contain', 'Your password is incorrect.')
        cy.wait(delay);
    }

    SeeLoginEmailError(){
        cy.get(loginErrorButton).should('be.visible');
        cy.get(loginErrorMessage).should('to.contain', 'There is no user with that email address.')
        cy.wait(delay);
    }
}

export const loginPage = new LoginPage();