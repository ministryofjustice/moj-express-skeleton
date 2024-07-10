import express from 'express';
import axios from 'axios';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main/index', { title: 'Express' });
});

// Make an API call with Axios 
// GET users from external API
router.get('/users', async (req, res, next) => {
  try {
    // json data of fake users
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  }
});

export default router;
