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

### Skeleton Database

Within this skeleton [SQLite3](https://docs.python.org/3/library/sqlite3.html) is set up and ready to use out of the box. However, if you wish to use something
else as your database, please see [Database integration Options](https://expressjs.com/en/guide/database-integration.html).

Within the skeleton you'll find a js file called `sqliteSetupup.js` under the utils directory.

Here is where you can initialise your database. Example below:

```sql
db.serialize(() => {
db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
db.run("INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')");
db.run("INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane@example.com')");
});
```

Middleware `setupDB`, is set up to allow database queries to be run against your SQLite3.

`setupDB` sets up db to access in any of your routes, such as this example below.

```mjs
router.get('/users', (req, res, next) => {
  req.db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});
```

### Linting

ESLint is a static code analysis tool for identifying and fixing problems in JavaScript code. It helps maintain code 
quality and consistency across a project by enforcing a set of coding standards and best practices. ESLint can catch 
syntax errors, stylistic issues, and potential bugs before they become actual problems.

In this project, ESLint is configured using the `eslint.config.js` file. This file uses the new flat configuration format 
introduced in ESLint v8, allowing for a more modular and flexible setup. Alter and configure this file to meet your 
project needs.

To run ESlint:

`npx eslint .`

To apply fixes that ESLint has found

`npx eslint . --fix`