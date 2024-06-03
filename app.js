import createError from 'http-errors';
import express from 'express';
import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();

// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
  })
);
// Reducing fingerprinting
app.disable('x-powered-by')

// set up cookie security 
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))

// view engine setup
app.set('views', path.join(path.dirname(new URL(import.meta.url).pathname), 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// custom 404 and status example
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;