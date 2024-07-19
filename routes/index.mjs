// routes/index.mjs
import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main/index', { title: 'Express' });
});

// Make an API call with `Axios` and `middleware-axios`
// GET users from external API
router.get('/users', async (req, res, next) => {
  try {
      // Use the Axios instance attached to the request object
      const response = await req.axiosMiddleware.get('https://jsonplaceholder.typicode.com/users');
      res.json(response.data);
  } catch (error) {
      next(error);
  }
});

export default router;