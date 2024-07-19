# MOJ Express Skeleton
MOJ Express.js Skeleton for all your frontend needs.

## Getting started

Create your local config file `.env` from the template file:

```shell
cp .env.example .env
```

Install and run application

```shell
npm install
npm run dev
```

Then, load http://localhost:3000/ in your browser to access the app.

### Running the app locally with DEBUG enabled

`DEBUG=moj-express-skeleton:* npm start`

Then, load http://localhost:3000/ in your browser to access the app.

### Apps Security

- [helmet.js](https://helmetjs.github.io/)
- [express-session](https://www.npmjs.com/package/express-session)


## Axios

Within this skeleton [axios](https://github.com/axios/axios) with [middleware-axios](https://github.com/krutoo/middleware-axios) (used a utility `../utils/axiosSetp.mjs` and can be extended with further middleware) is set up and ready to use out of the box.

Below is an example of implementation of how to use the `axios_api` function, in other modules to make server/api calls:

```mjs
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
```