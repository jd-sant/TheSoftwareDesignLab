import { dashboardPage } from '../elements/pages/DashboardPage';
import { homePage } from '../elements/pages/HomePage';
import { postPage } from '../elements/pages/PostPage';

describe('Creacion de post', () => {
    context('Given I access the Ghost admin login', () => {
        beforeEach(() => {
            homePage.givenGoToLoginPage();
        });

        context('When I fill the login form and submit login', () => {
            beforeEach(() => {
                homePage.whenFillTheLoginForm();
            });

            context('Then I go to new post page', () => {
                beforeEach(() => {
                    dashboardPage.thenGoToNewPostPage();
                });
                // Primer escenario donde se crea un post normal
                context('PA004-C - Then I can fill the post form', () => {
                    beforeEach(() => {
                        postPage.thenFillThePostForm();
                    });
                    context('Then I can publish the post', () => {
                        beforeEach(() => {
                            postPage.thenPublishThePost();
                        });

                        it('Then the post should be published', () => {
                            postPage.thenSeePostPublished();
                        });
                    });
                });
                // Segundo escenario donde se crea un post con caracteres especiales
                context('PA005-C - Then I can fill the post form with special characters', () => {
                    beforeEach(() => {
                        postPage.thenFillThePostFormSpecial();
                    });
                    context('Then I can publish the post', () => {
                        beforeEach(() => {
                            postPage.thenPublishThePost();
                        });

                        it('Then the post should be published', () => {
                            postPage.thenSeeSpecialPostPublished();
                        });
                    });
                });
            });
        });
    });

    
});