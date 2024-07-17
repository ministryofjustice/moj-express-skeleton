import { create } from 'middleware-axios';

// create wrapped instance of axios to use normal axios instance
const axios_api = create({
  baseURL: process.env.API_BASE_URL || '', // Set your base URL here
});

// Export axios_api for use in other modules
export default axios_api;