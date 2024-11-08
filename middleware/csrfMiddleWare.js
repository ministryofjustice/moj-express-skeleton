import crypto from 'crypto';
import config from '../config.js';

/**
 * Generates a CSRF token as a 24-byte hex string.
 *
 * @returns {string} A randomly generated CSRF token.
 */
const generateCsrfToken = () => crypto.randomBytes(24).toString('hex');

/**
 * Generates a nonce token as a 16-byte base64 string.
 *
 * @returns {string} A randomly generated nonce token.
 */
const generateNonceToken = () => crypto.randomBytes(16).toString('base64');

/**
 * Middleware for CSRF protection and generating a nonce.
 * This middleware generates a CSRF token and a nonce for the current request.
 * It sets the CSRF token in a secure HTTP-only cookie and stores the nonce
 * in `res.locals` for use in templates and Content-Security-Policy.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const csrfProtection = (req, res, next) => {
  const csrfToken = req.cookies[config.csrf.cookieName] || generateCsrfToken();
  const nonceToken = generateNonceToken();

  // Store the nonce in res.locals for access in templates
  res.locals.cspNonce = nonceToken;

  // Set the CSRF token in a secure HTTP-only cookie
  res.cookie(config.csrf.cookieName, csrfToken, {
    httpOnly: config.csrf.httpOnly,
    secure: config.csrf.secure,
  });

  // Store the CSRF token in res.locals for access in templates
  res.locals.csrfToken = csrfToken;

  // Set the Content-Security-Policy header with the nonce
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' 'nonce-${nonceToken}';`
  );

  next();
};

/**
 * Middleware to validate the CSRF token.
 * This middleware checks if the CSRF token from the request body matches
 * the token stored in the cookie. If the tokens do not match, a 403 error
 * is returned, indicating an invalid CSRF token.
 *
 * @param {import('express').Request} req - The Express request object, which contains the CSRF token in the body.
 * @param {import('express').Response} res - The Express response object, used to send a 403 status code if validation fails.
 * @param {Function} next - The next middleware function, called if the CSRF token is valid.
 * @returns {void} This function does not return a value; it either calls `next()` or ends the response cycle.
 */
export const csrfValidate = (req, res, next) => {
  const csrfTokenFromBody = req.body._csrf;
  const csrfTokenFromCookie = req.cookies[config.csrf.cookieName];

  // Validate the CSRF token
  if (!csrfTokenFromBody || csrfTokenFromBody !== csrfTokenFromCookie) {
    res.status(403).send('Invalid CSRF token');
    return;
  }

  next();
};

