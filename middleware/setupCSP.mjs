import crypto from 'crypto';

/**
 * Middleware function to set up a Content Security Policy (CSP) nonce for each request.
 *
 * @param {Object} app - The Express application instance.
 */
function setupCSP(app) {
    /**
     * Middleware to generate a CSP nonce and add it to the response locals.
     *
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The next middleware function in the stack.
     */
    function nonceMiddleware(req, res, next) {
        res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
        next();
    }

    app.use(nonceMiddleware);
}

export default setupCSP;