import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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


// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set up common middleware
setupMiddlewares(app);

// app.use(axiosMiddleware);

//Set up DB to be used in requests
// setupDB(app)

// Response compression
app.use(compression({
  /**
   *
   * @param req
   * @param res
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

// Middleware function to set up a Content Security Policy (CSP) nonce for each request.
app.use(csrfProtection);

// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
helmetSetup(app);

// Reducing fingerprinting
app.disable('x-powered-by');

// Set up cookie security
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId',
  resave: false,
  saveUninitialized: false
}));

// view engine setup
nunjucksSetup(app);

// Apply the general rate limiter to all requests
rateLimitSetUp(app, config);

// Config in templates
setupConfig(app);

app.use(logger('dev'));

// Register routes
app.use('/', indexRouter);

// Use livereload middleware
if (process.env.NODE_ENV === 'development') {
  app.use(livereload());
}

// Start the server
app.listen(config.app.port, () => {
  console.log(`Server running on port ${config.app.port}`);
});