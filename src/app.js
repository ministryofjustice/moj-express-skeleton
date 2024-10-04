import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import nunjucksSetup from '../utils/nunjucksSetup';
import rateLimitSetUp from '../utils/rateLimitSetUp';
import { createRequire } from 'module';
import helmetSetup from '../utils/helmetSetup';
import setupCSP from '../middleware/setupCSP';
import config from '../config';
import indexRouter from '../routes/index';
// import compression from 'compression';
// import axiosMiddleware from '../utils/axiosSetup';
// import setupDB from '../middleware/setupDB';
import setupConfig from '../middleware/setupConfigs';
import bodyParser from 'body-parser';
import livereload from 'connect-livereload';

const require = createRequire(import.meta.url);


const csurf = require('csurf');
const logger = require('morgan');


// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// app.use(axiosMiddleware);

//Set up DB to be used in requests
// setupDB(app)

// Response compression
// app.use(compression({
//   /**
//    *
//    * @param req
//    * @param res
//    */
//   filter: (req, res) => {
//     if (req.headers['x-no-compression']) {
//       // Don't compress responses with this request header
//       return false;
//     }
//     // Fallback to the standard filter function
//     return compression.filter(req, res);
//   }
// }));

// Middleware function to set up a Content Security Policy (CSP) nonce for each request.
setupCSP(app);

// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
helmetSetup(app);

// csrfProtection setup
const csrfProtection = csurf({ cookie: true });

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

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/',csrfProtection, indexRouter);

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });
//
// // error handler
// app.use((err, req, res, next) => {
//   // Set locals, providing error details
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // Set status based on error status or default to 500
//   const statusCode = err.status || 500;
//   res.status(statusCode);
//
//   // Render the error page with both the error message and status code
//   res.render('main/error', {
//     error: res.locals.message,
//     status: statusCode
//   });
// });

// Use livereload middleware
if (process.env.NODE_ENV === 'development') {
  app.use(livereload());
}

// Start the server
app.listen(config.app.port, () => {
  console.log(`Server running on port ${config.app.port}`);
});

// export default app;