# MOJ Express.js Skeleton
![govuk-frontend 5.4.0](https://img.shields.io/badge/govuk--frontend%20version-5.4.0-005EA5?logo=gov.uk&style=flat)

Express.js is a fast, unopinionated, minimalist web framework for Node.js.

**MOJ Express.js Skeleton is a community tool using the GOV.UK Design System. The Design System team is not responsible for it and cannot support you with using it. Contact the maintainers directly if you need help or you want to request a feature.**

This is a template app using the GOV.UK Frontend and GOV.UK Design System which is designed to get a new project started quicker.

The app is provided intentionally bare, with just the essential parts that all services need, such as error pages, accessibility statement and privacy notice. It uses a number of other packages to provide the [features](#features) described below with sensible and best-practice defaults. Please read the next steps section for guidance on how to start building out your app on top of this template.

## Prerequisites
- node stable version [20.15.1]

## Getting started

### Set local environment variables

Create your local config file `.env` from the template file:

```shell
cp .env.example .env
```

### Install and run application for development
```shell
npm install
npm run build
npm run dev
```
Then, load http://localhost:3000/ in your browser to access the app.

### Install and run application for production
```shell
npm install
npm run build
npm run start
```

#### TO NOTE:

You may have to tell your local machine to use the latest version of node already installed on your device, before installing and running the application. Use the following command.

```
nvm install node
```

## Routing
This skeleton uses the built-in Express JS routing. 

A route is a section of Express code that associates an HTTP verb (`GET`, `POST`, `PUT`, `DELETE`, etc.), a URL path/pattern, and a function that is called to handle that pattern.

[You can find further documentation here](https://expressjs.com/en/guide/routing.html).

## Testing
There are many frameworks to test your Express.js application (a few of these frameworks will be signposted below), but you will want to split out your test suite to cover:

- Unit Tests - test individual code components to ensure each function operates as intended.
- Integration Tests - assess the coherence of the entire application, ensuring smooth interactions between various parts.
- End-to-end (E2E) Tests - assess the entire software system, from the user interface to the database.

### Unit/Integration Testing example frameworks
- Choose a testing framework (e.g., [Mocha](https://mochajs.org/), [Jest](https://jestjs.io/)).
- Write test cases for individual functions and combined modules.
- Mock dependencies (e.g., databases, external services).
- Run tests and check outputs against expected results.

### E2E Testing example frameworks
- Choose an E2E testing tool (e.g., [Cypress](https://www.cypress.io/), [Selenium](https://medium.com/@mpgelber7495/a-step-by-step-guide-to-setting-up-selenium-webdriver-with-node-js-1167bca35c38)).
- Write test scripts simulating user interactions.
- Set up a test environment mirroring production.
- Run tests and verify overall application behaviour.


## Features
- [Asset management](#asset-management)
- [Cache busting](#cache-busting)
- [Form validation](#form-validation)
- [CSRF protection](#csrf-protection)
- [Content Security Policy (CSP)](#content-security-policy-csp)
- [Response compression](#response-compression)
- [Rate limiting](#rate-limiting)
- [Nunjucks support](#nunjucks-support)
- [ES6 JS Documentation](#es6-js-documentation)
- [Linter](#linter)
- [Axios](#axios)
- [SQLite database](#sqlite-database)

## Examples of features 
Please refer to the specific packages documentation for more details.

### Asset management
This is node.js scripts at them moment, but [ESBuild](https://esbuild.github.io/) coming soon.

### Cache busting
Caching allows Express.js applications to store and serve frequently requested data efficiently, reducing the strain on servers and minimizing latency. This skeleton improves caching through:
- intelligent browser caching, when using the skeleton for development of an application
- employing a package management tool, to improve the caching process of installing, upgrading, configuring, and removing software from your application

### Form validation
This template app contains a basic demo for form validation, when running this app locally. You can find further information on the validation used, by searching in the [Express documentation](https://www.npmjs.com/package/express-validator)


### CSRF protection
The template use the [csurf](https://npmjs.com/package/csurf) middleware, to help keep your app secure.

### Content Security Policy (CSP)
This app uses [helmet.js](https://helmetjs.github.io/) to help secure this Express.js template app by setting HTTP response headers, which includes your CSP. 

### Response compression
The app uses a Node.js compression middleware called [compression](https://www.npmjs.com/package/compression). The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.


### Rate limiting
This skeleton uses a basic rate-limiting middleware for Express.js, called `express-rate-limit`. It is used to limit repeated requests to public APIs and/or endpoints such as password reset. 

For further information please [visit the documentation here](https://www.npmjs.com/package/express-rate-limit?activeTab=readme).


### Nunjucks support
A rich, high-performance JavaScript templating language, supported by all modern browsers. Nunjucks is customisable with extensions and filters; it offers inheritance, asynchronous control, auto escaping and other features. 

[Nunjucks documentation](https://mozilla.github.io/nunjucks/).

### ES6 JS Documentation
ES6 refers to version 6 of the ECMA Script programming language. ECMA Script is the standardized name for JavaScript, and version 6 is the next version after version 5, released in 2011. It is a significant enhancement to the JavaScript language and adds many more features to simplify large-scale software development.

Find out more [here](https://www.makeuseof.com/tag/es6-javascript-programmers-need-know/).

### Linter
ESLint is a static code analysis tool for identifying and fixing problems in JavaScript code. It helps maintain code 
quality and consistency across a project by enforcing a set of coding standards and best practices. ESLint can catch 
syntax errors, stylistic issues, and potential bugs before they become actual problems.

In this project, ESLint is configured using the `eslint.config.js` file. This file uses the new flat configuration format 
introduced in ESLint v8, allowing for a more modular and flexible setup. Alter and configure this file to meet your 
project needs.

To run ESlint:

`npm run lint`

### Axios
Within this skeleton [axios](https://github.com/axios/axios) with [middleware-axios](https://github.com/krutoo/middleware-axios) (used as a utility `../utils/axiosSetup.js`, and can be extended with further middleware) is set up and ready to use out of the box.

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

### SQLite database


Within this skeleton [SQLite3](https://docs.python.org/3/library/sqlite3.html) is set up and ready to use out of the box. However, if you wish to use something
else as your database, please see [Database integration Options](https://expressjs.com/en/guide/database-integration.html).

Within the skeleton you'll find a js file called `sqliteSetup.js` under the utils directory.

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

## Contributors
- [Patrick Sweeting](https://github.com/psweeting1) (Primary maintainer)
- [Imtiaz Ahmed](https://github.com/imtiazAhmd) (Primary maintainer)
- [Masum Khan](https://github.com/MazOneTwoOne) (Maintainer)
- [Stephanie de Jong](https://github.com/skdejong) (Maintainer)

## Support
This software is provided *"as-is"* without warranty. Support is provided on a *"best endeavours"* basis by the maintainers and open source community.

If you are a civil servant you can sign up to the [UK Government Digital Slack](https://ukgovernmentdigital.slack.com/signup) workspace to contact the maintainers listed [above](#contributors) and the community of people using this project in the [#govuk-design-system](https://ukgovernmentdigital.slack.com/archives/C6DMEH5R6) channel.


## Acknowledgment and Attribution
If you find this project helpful and decide to use it in your own work, we kindly ask that you give proper credit to this repository. A simple acknowledgment in your project's documentation, website, or application would be greatly appreciated. Here are a few ways you can do this:
- **Link back to this repository**: Include a link to this GitHub repository in your project's documentation or README file.
- **Mention our contribution**: When discussing your project or presenting it to others, please mention that part of your project is based on our work.
- **Cite our work**: If your project includes a list of contributors or a "Credits" section, consider adding our repository as one of the sources.

```
This project uses code from [Your Repository Name](https://github.com/yourusername/your-repository), originally developed by [Your Name or Organization].
```
Thank you for your support and for helping to spread the word about our work!