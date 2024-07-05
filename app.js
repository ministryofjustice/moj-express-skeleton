const createError = require('http-errors');
const express =  require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucksSetup = require('./utils/nunjucksSetup');
const compression = require('compression');
const rateLimitSetUp = require('./utils/rateLimitSetUp');
const helmetSetup = require('./utils/helmetSetup');
const setupCSP = require('./middleware/setupCSP');
const setupDB = require('./middleware/setupDB');
const config = require('./config');

const indexRouter = require('./routes/index.js');

const app = express();

//Set up DB to be used in requests
setupDB(app)

// Response compression
app.use(compression({
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
setupCSP(app)

// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
helmetSetup(app)

// Reducing fingerprinting
app.disable('x-powered-by')

// Set up cookie security 
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))

// view engine setup
nunjucksSetup(app)

// Apply the general rate limiter to all requests
rateLimitSetUp(app, config)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // Set locals, providing error details
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Set status based on error status or default to 500
  const statusCode = err.status || 500
  res.status(statusCode);

  // Render the error page with both the error message and status code
  res.render('main/error', {
    error: res.locals.message,
    status: statusCode
  });
});

module.exports = app;