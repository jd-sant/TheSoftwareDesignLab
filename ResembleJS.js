const compareImages = require("resemblejs/compareImages");
const fs = require('fs');
const path = require('path');

const options = {
    output: {
        errorColor: {
            red: 255,
            green: 0,
            blue: 255
        },
        errorType: 'movement',
        transparency: 0.3,
        largeImageThreshold: 1200,
        useCrossOrigin: false,
        outputDiff: true
    },
    scaleToSameSize: true,
    ignore: 'antialiasing'
};

async function ResembleJS(browser1, browser2) {
    const baseDir = './cypress/screenshots/';
    const diffDir = './cypress/screenshots/compare_version/';

    if (!fs.existsSync(diffDir)) {
        fs.mkdirSync(diffDir, { recursive: true });
    }

    const testNames = fs.readdirSync(baseDir).filter(file => fs.lstatSync(path.join(baseDir, file)).isDirectory());

    for (const testName of testNames) {
        if (testName != 'compare_version') {
            const testDir = path.join(baseDir, testName);
            const subTestNames = fs.readdirSync(testDir).filter(file => fs.lstatSync(path.join(testDir, file)).isDirectory());

            for (const subTestName of subTestNames) {
                const baseImagesPath1 = path.join(testDir, subTestName, browser1);
                const baseImagesPath2 = path.join(testDir, subTestName, browser2);
                const diffSubDir = path.join(diffDir, testName, subTestName, `${browser1}_vs_${browser2}`);

                if (!fs.existsSync(baseImagesPath1) || !fs.existsSync(baseImagesPath2)) {
                    console.warn(`Skipping ${testName}/${subTestName} as it does not exist in both browsers`);
                    continue;
                }

                if (!fs.existsSync(diffSubDir)) {
                    fs.mkdirSync(diffSubDir, { recursive: true });
                }

                const baseImages1 = fs.readdirSync(baseImagesPath1).filter(file => path.extname(file) === '.png');
                const reports = [];

                for (const image of baseImages1) {
                    const baseImagePath1 = path.join(baseImagesPath1, image);
                    const baseImagePath2 = path.join(baseImagesPath2, image);
                    const diffImagePath = path.join(diffSubDir, `diff-${image}`);

                    if (fs.existsSync(baseImagePath2)) {
                        const data = await compareImages(
                            fs.readFileSync(baseImagePath1),
                            fs.readFileSync(baseImagePath2),
                            options
                        );

                        const baseImage1 = fs.readFileSync(baseImagePath1).toString('base64');
                        const baseImage2 = fs.readFileSync(baseImagePath2).toString('base64');

                        const diffImageBuffer = Buffer.from(data.getBuffer());
                        fs.writeFileSync(diffImagePath, diffImageBuffer);

                        const diffImageB64 = diffImageBuffer.toString('base64');
                        reports.push(createReportSection(baseImage1, baseImage2, diffImageB64, data.misMatchPercentage, image, browser1, browser2));
                    }
                }
                fs.writeFileSync(path.join(diffSubDir, 'report.html'), createReport(reports));
            }
        }
    }
}


function createReport(reports) {
    return `
    <html>
        <head>
            <title>VRT Report</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        </head>
        <body>
            <div class="container">
                <h1 class="my-4">Visual Regression Test Report</h1>
                ${reports.join('')}
            </div>
        </body>
    </html>`;
}

function createReportSection(baseImage1, baseImage2, diffImageB64, diffPercent, step, browser1, browser2) {
    return `
    <h2>Step: ${step}</h2>
    <div class="row">
        <div class="col-md-6">
            <h3>${browser1}</h3>
            <img src="data:image/png;base64, ${baseImage1}" class="img-fluid" alt="Browser 1 Image">
        </div>
        <div class="col-md-6">
            <h3>${browser2}</h3>
            <img src="data:image/png;base64, ${baseImage2}" class="img-fluid" alt="Browser 2 Image">
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
            <p>Found a ${diffPercent}% pixel difference</p>
        </div>
    </div>`;
}

// Obtener los parámetros de entrada desde la terminal
const browser1 = process.argv[2];
const browser2 = process.argv[3];

if (!browser1 || !browser2) {
    console.error('Usage: node ResembleJS.js <browser1> <browser2>');
    process.exit(1);
}

ResembleJS(browser1, browser2);