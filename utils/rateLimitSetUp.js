import rateLimit from 'express-rate-limit';

/**
 * Sets up rate limiting for the given Express app.
 *
 * @param {object} app - The Express app instance.
 * @param {object} config - The configuration object containing rate limiting settings.
 */
const rateLimitSetUp = (app, config) => {
  /**
   * Rate limiter for general routes.
   * Limits each IP to 100 requests per 15 minutes.
   */
  const generalLimiter = rateLimit({
    windowMs: config.RATE_WINDOW_MS,
    max: config.RATE_LIMIT_MAX,
    message: 'Too many requests, please try again later.'
  });

  // Apply the general rate limiter to all requests
  app.use(generalLimiter);
};

export default rateLimitSetUp;