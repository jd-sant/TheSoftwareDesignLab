import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

function createReportInitial() {
    return `
    <html>
        <head>
            <title>VRT Report</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        </head>
        <body>
            <div class="container">
                <h1 class="my-4">Visual Regression Test Report</h1>`
}

function createReportFinal() {
    return `
            </div>
        </body>
    </html>`;
}
function createReportSection(baseImage, rcImage, diffImageB64, diffPercent, step) {
    return `
    <h2>Step: ${step}</h2>
    <div class="row">
        <div class="col-md-6">
            <h3>Base version (4.5)</h3>
            <img src="data:image/png;base64, ${baseImage}" class="img-fluid" alt="Base Image">
        </div>
        <div class="col-md-6">
            <h3>RC version (5.96)</h3>
            <img src="data:image/png;base64, ${rcImage}" class="img-fluid" alt="RC Image">
        </div>
    </div>
    <div class="row my-4">
        <div class="col text-center">
            <h3>Differences</h3>
            <img src="data:image/png;base64, ${diffImageB64}" class="img-fluid" alt="Diff Image">
        </div>
    </div>
    <div class="row">
        <div class="col">
            <p>Found a ${diffPercent.toFixed(2)}% pixel difference</p>
        </div>
    </div>`;
}

function compareImages(baseImagePath, rcImagePath, diffImagePath, diffDir, test) {
    cy.readFile(baseImagePath, 'base64').then(baseImage => {
        cy.readFile(rcImagePath, 'base64').then(rcImage => {

            const img1 = PNG.sync.read(Buffer.from(baseImage, 'base64'));
            const img2 = PNG.sync.read(Buffer.from(rcImage, 'base64'));

            const { width, height } = img1;
            const diff = new PNG({ width, height });

            const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
                threshold: 0.1,
                includeAA: false,
                alpha: 0.1,
                aaColor: [255, 0, 0],
                diffColor: [255, 0, 255]
            });

            const diffPercent = (numDiffPixels / (width * height) * 100);

            const diffBuffer = PNG.sync.write(diff);
            const diffImageB64 = diffBuffer.toString('base64');

            cy.writeFile(diffImagePath, diffBuffer);

            // expect(diffPercent).to.be.below(40);
            var filename = baseImagePath.replace(/^.*[\\/]/, '');
            cy.writeFile(`./${diffDir}report-${test}.html`, createReportSection(baseImage, rcImage, diffImageB64, diffPercent, filename), { flag: 'a+' });

        });
    });
}

function comparePixelMatch(imagesToScan) {
    const test = Cypress.currentTest.title;
    const baseDir = './cypress/screenshots/base_version/' + test + '/';
    const rcDir = './cypress/screenshots/rc_version/' + test + '/';
    const diffDir = './cypress/screenshots/compare_version/' + test + '/';
    cy.writeFile(`./${diffDir}report-${test}.html`, createReportInitial());
    imagesToScan.forEach(image => {
        const baseImagePath = `${baseDir}${image}`;
        const rcImagePath = `${rcDir}${image}`;
        const diffImagePath = `${diffDir}diff-${image}`;

        compareImages(baseImagePath, rcImagePath, diffImagePath, diffDir, test);
    });
    cy.writeFile(`./${diffDir}report-${test}.html`, createReportFinal(), { flag: 'a+' });


}

describe('Compare images from two directories', () => {
    it('0_User_Creation.cy.js/PA001-C - Create admin user', () => {
        const images = ["000_NavigateToTheSite.png","001_CreateUserTypeSiteName.png","002_CreateUserTypeAdminName.png","003_CreateUserTypeAdminEmail.png","004_CreateUserTypeAdminPass.png","005_UserCreated.png","006_SettingsButton.png","007_EditSiteNameButton.png","008_SiteNameField.png","009_SiteDescriptionField.png","010_SaveButton.png"]; // Lista de nombres de imágenes
        comparePixelMatch(images);

    });
    it('1_Post_Creation.cy.js/PA004-C - Create a normal post', () => {
        const images = []; // Lista de nombres de imágenes
        comparePixelMatch(images);
    });
    it('2_Tag_Creation.cy.js/PA008-C - Create a tag', () => {
        const images = ["000_NavigateToTheSite.png", "001_UserLoginTypeEmail.png", "002_UserLoginTypePass.png", "003_UserLoggedIn.png", "004_BeforeNavigateToNewTag.png", "005_AfterNavigateToNewTag.png", "006_tagBeforeClearAndType.png", "007_fillNameTag.png", "008_fillColorTag.png", "009_fillDescriptionTag.png", "010_AttachFileTag.png", "011_tagAfterClearAndType.png", "012_tagBeforeSaveButton.png", "013_tagAfterSaveButton.png", "014_BeforeTagCreated.png", "015_ListTagCreated.png", "016_AfterTagCreated.png"];
        comparePixelMatch(images);
    })

    it('PA012-C - Create a member', () => {
        const images = ["000_NavigateToTheSite.png", "001_UserLoginTypeEmail.png", "002_UserLoginTypePass.png", "003_UserLoggedIn.png", "004_navigatedToMemberPage.png", "005_navigatedToCreateMemberPage.png", "006_memberBeforeFill.png", "007_memberAfterFill.png", "008_memberSaveAction.png", "009_returnToMemberPage.png", "010_findMemberCreated.png"];
        comparePixelMatch(images);
    })

    it('4_Page_Creation.cy.js/PA017-C - Create a page', () => {
        const images = ["000_NavigateToTheSite.png", "001_UserLoginTypeEmail.png", "002_UserLoginTypePass.png", "003_UserLoggedIn.png", "004_BeforeClearPageTitle.png", "005_BeforeTypePageTitle.png", "006_AfterTypePageTitle.png", "007_BeforeTypePageContent.png", "008_AfterTypePageContent.png", "009_BeforeClickingPublishPageButton.png", "010_BeforeClickingConfirmPublishPageButton.png", "011_AfterFinalPublishPage.png", "012_AfterCloseModalButton.png", "013_BeforeClickDropdownFilter.png", "014_AfterClickDropdownFilter.png", "015_AfterPublishedPageFilter.png", "016_ValidationPublishedPageFilter.png"]; // Lista de nombres de imágenes
        comparePixelMatch(images);
    });
});