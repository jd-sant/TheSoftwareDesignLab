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
            <h3>Reference</h3>
            <img src="data:image/png;base64, ${baseImage}" class="img-fluid" alt="Reference Image">
        </div>
        <div class="col-md-6">
            <h3>Test</h3>
            <img src="data:image/png;base64, ${rcImage}" class="img-fluid" alt="Test Image">
        </div>
    </div>
    <div class="row my-4">
        <div class="col text-center">
            <h3>Diff</h3>
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
        const images = ["000_NavigateToTheSite.png", "001_CreateUserTypeSiteName.png", "002_CreateUserTypeAdminName.png", "003_CreateUserTypeAdminEmail.png", "004_CreateUserTypeAdminPass.png", "005_UserCreated.png", "000_SettingsButton.png", "001_EditSiteNameButton.png", "002_SiteNameField.png", "003_SiteDescriptionField.png", "004_SaveButton.png"]; // Lista de nombres de imágenes
        comparePixelMatch(images);

    });
    it('1_Post_Creation.cy.js/PA004-C - Create a normal post', () => {
        const images = ["000_NavigateToTheSite.png", "001_UserLoginTypeEmail.png", "002_UserLoginTypePass.png", "003_UserLoggedIn.png", "000_NavigateToPostPage.png", "000_FillPostTittle.png", "001_FillPostContent.png", "002_PublishPostClick-1.png", "003_PublishPostClick-2.png", "004_CloseModal.png", "005_DropdownPostFilter.png", "006_OptionPublishedPost.png", "007_SeePostPublished.png"]; // Lista de nombres de imágenes
        comparePixelMatch(images);
    });
});