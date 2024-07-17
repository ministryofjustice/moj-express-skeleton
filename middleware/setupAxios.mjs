import axios from 'axios';

/**
 * Middleware setup function to use axios across app
 *
 * @param {Object} app - The Express application instance.
 */
const setupAxios = (app) => {
    /**
     * Middleware to add the database connection to the request object.
     *
     * @param {object} req - The Express request object.
     * @param {object} res - The Express response object.
     * @param {function} next - The next middleware function in the stack.
     */
    const axios = (req, res, next) => {
        req();
        res();
        next();
    };

    app.use(axios);
};

export default setupAxios;



// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});



