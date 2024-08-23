/**
 * Middleware to check if the cookie policy has been set via a JS cookie.
 * If set, it stores the policy in the session.
 */
const manageCookiePolicy = (app) => {
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