const nunjucks = require('nunjucks');
const path = require('path');

function nunjucksSetup(app) {
    const appInstance = app
    appInstance.set('view engine', 'njk')
    appInstance.locals.asset_path = '/assets/'

    // Tell nunjucks where to look for njk files
    nunjucks.configure(
        [
            path.join(__dirname, '../views'),
            'node_modules/govuk-frontend/dist',
            'node_modules/govuk-frontend/dist/components/',
        ],
        {
            autoescape: true,
            express: appInstance,
            watch: true
        },
    )
}

module.exports = nunjucksSetup;