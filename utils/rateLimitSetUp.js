const rateLimit = require('express-rate-limit');

/**
 * RateLimitSetUp for general routes.
 * Limits each IP to 100 requests per 15 minutes.
 */
/**
 * Sets up rate limiting for the given Express app.
 *
 * @param {Object} app - The Express app instance.
 *
 */
function rateLimitSetUp(app) {
    /**
     * Rate limiter for general routes.
     * Limits each IP to 100 requests per 15 minutes.
     */
    const generalLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        message: 'Too many requests, please try again later.'
    });

    // Apply the general rate limiter to all requests
    app.use(generalLimiter);
}

module.exports = rateLimitSetUp;