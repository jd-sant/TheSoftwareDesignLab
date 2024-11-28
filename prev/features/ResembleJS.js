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

async function ResembleJS() {
    const baseDir = './features/screenshots/base_version/';
    const rcDir = './features/screenshots/rc_version/';
    const diffDir = './features/screenshots/compare_version/';

    if (!fs.existsSync(diffDir)) {
        fs.mkdirSync(diffDir, { recursive: true });
    }

    const baseSubDirs = fs.readdirSync(baseDir).filter(file => fs.lstatSync(path.join(baseDir, file)).isDirectory());

    for (const subDir of baseSubDirs) {
        const baseImagesPath = path.join(baseDir, subDir);
        const rcImagesPath = path.join(rcDir, subDir);
        const diffSubDir = path.join(diffDir, subDir);

        if (!fs.existsSync(rcImagesPath)) {
            console.warn(`Skipping ${subDir} as it does not exist in rc_version`);
            continue;
        }

        if (!fs.existsSync(diffSubDir)) {
            fs.mkdirSync(diffSubDir, { recursive: true });
        }

        const baseImages = fs.readdirSync(baseImagesPath).filter(file => path.extname(file) === '.png');

        const reports = [];

        for (const image of baseImages) {
            const baseImagePath = path.join(baseImagesPath, image);
            const rcImagePath = path.join(rcImagesPath, image);
            const diffImagePath = path.join(diffSubDir, `diff-${image}`);

            if (fs.existsSync(rcImagePath)) {
                const data = await compareImages(
                    fs.readFileSync(baseImagePath),
                    fs.readFileSync(rcImagePath),
                    options
                );

                const baseImage64 = fs.readFileSync(baseImagePath).toString('base64');
                const rcImage64 = fs.readFileSync(rcImagePath).toString('base64');

                const diffImageBuffer = Buffer.from(data.getBuffer());
                fs.writeFileSync(diffImagePath, diffImageBuffer);

                const diffImageB64 = diffImageBuffer.toString('base64');
                reports.push(createReportSection(baseImage64, rcImage64, diffImageB64, data.misMatchPercentage, image));
            }
        }

        fs.writeFileSync(path.join(diffSubDir, 'report.html'), createReport(reports));
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
            <p>Found a ${diffPercent}% pixel difference</p>
        </div>
    </div>`;
}

ResembleJS();