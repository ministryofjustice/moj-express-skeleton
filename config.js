import dotenv from 'dotenv';
dotenv.config();

// Get environment variables
const config = {
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    CONTACT_PHONE: process.env.CONTACT_PHONE,
    DEPARTMENT_NAME: process.env.DEPARTMENT_NAME,
    DEPARTMENT_URL: process.env.DEPARTMENT_URL,
    RATELIMIT_HEADERS_ENABLED: process.env.RATELIMIT_HEADERS_ENABLED,
    RATELIMIT_STORAGE_URI: process.env.RATELIMIT_STORAGE_URI,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
    RATE_WINDOW_MS: parseInt(process.env.RATE_WINDOW_MS, 10) || 15 * 60 * 1000,
    SECRET_KEY: process.env.SECRET_KEY,
    SERVICE_NAME: process.env.SERVICE_NAME,
    SERVICE_PHASE: process.env.SERVICE_PHASE,
    SERVICE_URL: process.env.SERVICE_URL,
    app: {
        port: process.env.PORT || 3000,
        environment: process.env.NODE_ENV || 'development'
    },
    csrf: {
        cookieName: '_csrf',
        secure: process.env.NODE_ENV === 'production',  // Only secure in production
        httpOnly: true,  // Restrict client-side access
    },
    paths: {
        static: 'public',  // Path for serving static files
        views: 'src/views',  // Path for Nunjucks views
    }
};

export default config;