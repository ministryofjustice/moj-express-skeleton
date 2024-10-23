import nunjucks from 'nunjucks';
import path from 'path';

/**
 * Sets up Nunjucks as the template engine for the given Express application.
 * This function configures the view engine, sets the asset path, and specifies
 * the directories where Nunjucks should look for template files.
 *
 * @param {import('express').Application} app - The Express application instance.
 * @returns {void} This function does not return a value; it configures Nunjucks for the provided app.
 */
const nunjucksSetup = (app) => {
  const appInstance = app;
  appInstance.set('view engine', 'njk');
  appInstance.locals.asset_path = '/assets/';

  // Tell Nunjucks where to look for njk files
  nunjucks.configure(
    [
      path.join(path.resolve(), 'views'), // Main views directory
      'node_modules/govuk-frontend/dist', // GOV.UK Frontend templates
      'node_modules/govuk-frontend/dist/components/', // GOV.UK components
    ],
    {
      autoescape: true, // Enable auto escaping to prevent XSS attacks
      express: appInstance, // Bind Nunjucks to the Express app instance
      watch: true, // Watch for changes in template files during development
    }
  );
};

export default nunjucksSetup;
