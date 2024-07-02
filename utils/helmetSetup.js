const helmet = require('helmet');

/**
 * Sets up Helmet middleware for the Express application to configure Content Security Policy (CSP).
 *
 * @param {Object} app - The Express application instance.
 */
function helmetSetup(app) {
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: "'self'",
            scriptSrc: [
                "'self'",
                /**
                 * Function to dynamically add a CSP nonce for scripts.
                 *
                 * @param {Object} req - The Express request object.
                 * @param {Object} res - The Express response object.
                 * @returns {string} - The CSP nonce string.
                 */
                    (req, res) => `'nonce-${res.locals.cspNonce}'`
            ],
            imgSrc: [
                "'self'"
            ],
            connectSrc: [
                "'self'",
            ]
        }
    }));
}

module.exports = helmetSetup;