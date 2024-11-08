import config from '../config.js';

/**
 * Middleware setup function to attach configuration settings to response locals.
 * This makes config values accessible in all templates rendered by the app.
 *
 * @param {object} app - The Express application instance.
 */
const setupConfig = (app) => {
  /**
   * Middleware to add config to response locals.
   *
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   * @param {Function} next - The next middleware function in the stack.
   */
  const configMiddleware = (req, res, next) => {
    res.locals.config = config;
    next();
  };
  app.use(configMiddleware);
};

export default setupConfig;