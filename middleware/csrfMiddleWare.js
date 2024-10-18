import crypto from 'crypto';
import config from '../config.js';

const generateCsrfToken = () => crypto.randomBytes(24).toString('hex');

export const csrfProtection = (req, res, next) => {
  const csrfToken = req.cookies[config.csrf.cookieName] || generateCsrfToken();
  res.cookie(config.csrf.cookieName, csrfToken, {
    httpOnly: config.csrf.httpOnly,
    secure: config.csrf.secure
  });
  res.locals.csrfToken = csrfToken;
  next();
};

export const csrfValidate = (req, res, next) => {
  const csrfTokenFromBody = req.body._csrf;
  const csrfTokenFromCookie = req.cookies[config.csrf.cookieName];

  if (!csrfTokenFromBody || csrfTokenFromBody !== csrfTokenFromCookie) {
    return res.status(403).send('Invalid CSRF token');
  }
  next();
};