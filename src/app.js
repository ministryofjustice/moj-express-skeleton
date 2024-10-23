import express from 'express';
import { createRequire } from 'module';
import { csrfProtection } from '../middleware/csrfMiddleWare.js';
import { setupMiddlewares } from '../middleware/commonMiddleware.js';
import setupConfig from '../middleware/setupConfigs';
import session from 'express-session';
import nunjucksSetup from '../utils/nunjucksSetup';
import rateLimitSetUp from '../utils/rateLimitSetUp';
import helmetSetup from '../utils/helmetSetup';
import config from '../config';
import indexRouter from '../routes/index';
// import axiosMiddleware from '../utils/axiosSetup';
// import setupDB from '../middleware/setupDB';
import livereload from 'connect-livereload';

const require = createRequire(import.meta.url);
const logger = require('morgan');
const compression = require('compression');

const app = express();

/**
 * Sets up common middleware for handling cookies, body parsing, etc.
 * @param {import('express').Application} app - The Express application instance.
 */
setupMiddlewares(app);

// app.use(axiosMiddleware);

// Set up DB to be used in requests
// setupDB(app)

/**
 * Response compression setup. Compresses responses unless the 'x-no-compression' header is present.
 * Improves the performance of your app by reducing the size of responses.
 */
app.use(compression({
  /**
   * Custom filter for compression.
   * Prevents compression if the 'x-no-compression' header is set in the request.
   *
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   * @returns {boolean} - Returns true if compression should be applied, false otherwise.
   */
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // Don't compress responses with this request header
      return false;
    }
    // Fallback to the standard filter function
    return compression.filter(req, res);
  }
}));

/**
 * Middleware function to set up a Content Security Policy (CSP) nonce for each request.
 * This helps in preventing certain types of attacks like XSS.
 */
app.use(csrfProtection);

/**
 * Sets up security headers using Helmet to protect the app from well-known web vulnerabilities.
 *
 * @param {import('express').Application} app - The Express application instance.
 */
helmetSetup(app);

// Reducing fingerprinting by removing the 'x-powered-by' header
app.disable('x-powered-by');

/**
 * Set up cookie security for sessions.
 * Configures session management with secure cookie settings and session IDs.
 */
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 's3Cur3', // Secret for session encryption
  name: 'sessionId', // Custom session ID cookie name
  resave: false, // Prevents resaving unchanged sessions
  saveUninitialized: false // Only save sessions that are modified
}));

/**
 * Sets up Nunjucks as the template engine for the Express app.
 * Configures the view engine and template paths.
 *
 * @param {import('express').Application} app - The Express application instance.
 */
nunjucksSetup(app);

/**
 * Applies a general rate limiter to all requests to prevent abuse.
 *
 * @param {import('express').Application} app - The Express application instance.
 * @param {object} config - Configuration object containing rate limit settings.
 */
rateLimitSetUp(app, config);

/**
 * Sets up application-specific configurations that are made available in templates.
 *
 * @param {import('express').Application} app - The Express application instance.
 */
setupConfig(app);

/**
 * Sets up request logging using Morgan for better debugging and analysis.
 */
app.use(logger('dev'));

/**
 * Registers the main router for the application.
 * Serves routes defined in the 'indexRouter' module.
 */
app.use('/', indexRouter);

/**
 * Enables live-reload middleware in development mode to automatically reload
 * the server when changes are detected.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(livereload());
}

/**
 * Starts the Express server on the specified port.
 * Logs the port number to the console upon successful startup.
 */
app.listen(config.app.port, () => {
  console.log(`Server running on port ${config.app.port}`);
});
