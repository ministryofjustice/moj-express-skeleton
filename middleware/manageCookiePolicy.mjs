/**
 * Middleware to manage the cookie policy for an Express application.
 * This middleware checks if the `cookies_policy` cookie is set and valid,
 * and then sets a corresponding `cookies_policy` flag in `res.locals` for use in templates.
 *
 * @param {Object} app - The Express application instance.
 */
const manageCookiePolicy = (app) => {
    /**
     * Middleware function to check if the cookie policy is set.
     * It verifies the existence and validity of the `cookies_policy` cookie.
     *
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The next middleware function in the stack.
     */
    const checkCookiePolicySet = (req, res, next) => {
        const cookiesPolicy = req.cookies.cookies_policy;

        if (cookiesPolicy) {
            try {
                // Check if the analytics or functional cookies are accepted
                JSON.parse(cookiesPolicy);
                res.locals.cookies_policy = true;
            } catch (error) {
                console.error('Failed to parse cookies_policy:', error);
                res.locals.cookies_policy = false;
            }
        } else {
            res.locals.cookies_policy = false;
        }
        next();
    }
    app.use(checkCookiePolicySet)
};

export default manageCookiePolicy;