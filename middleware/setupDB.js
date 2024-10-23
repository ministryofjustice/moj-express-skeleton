import db from '../utils/sqliteSetup.js';

/**
 * Middleware setup function to attach the database connection to request objects.
 * This makes the database accessible in all request handlers.
 *
 * @param {object} app - The Express application instance.
 */
const setupDB = (app) => {
  /**
   * Middleware to add the database connection to the request object.
   *
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   * @param {Function} next - The next middleware function in the stack.
   */
  const dbRequest = (req, res, next) => {
    req.db = db;
    next();
  };

  app.use(dbRequest);
};

export default setupDB;