import helmet from 'helmet';

/**
 * Sets up Helmet middleware for the Express application to configure Content Security Policy (CSP).
 *
 * @param {object} app - The Express application instance.
 */
export const helmetSetup = (app) => {
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['\'self\''],
      scriptSrc: [
        '\'self\'',
        /**
         * Function to dynamically add a CSP nonce for scripts.
         *
         * @param {object} req - The Express request object.
         * @param {object} res - The Express response object.
         * @returns {string} - The CSP nonce string.
         */
        (req, res) => `'nonce-${res.locals.cspNonce}'`
      ],
      imgSrc: ['\'self\''],
      connectSrc: ['\'self\'']
    }
  }));
};
