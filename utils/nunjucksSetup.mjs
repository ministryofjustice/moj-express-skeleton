import nunjucks from 'nunjucks';
import path from 'path';

const nunjucksSetup = (app) => {
    const appInstance = app;
    appInstance.set('view engine', 'njk');
    appInstance.locals.asset_path = '/assets/';

    // Tell nunjucks where to look for njk files
    nunjucks.configure(
        [
            path.join(path.resolve(), 'views'),
            'node_modules/govuk-frontend/dist',
            'node_modules/govuk-frontend/dist/components/',
        ],
        {
            autoescape: true,
            express: appInstance,
            watch: true
        }
    );
}

export default nunjucksSetup;