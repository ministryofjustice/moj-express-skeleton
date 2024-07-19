# MOJ Express Skeleton
![govuk-frontend 5.4.0](https://img.shields.io/badge/govuk--frontend%20version-5.4.0-005EA5?logo=gov.uk&style=flat)

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

### Install and run application
```
npm install
npm run dev
```
Then, load http://localhost:3000/ in your browser to access the app.

#### TO NOTE:

You may have to tell your local machine to use the latest version of node already installed on your device, before installing and running the application. Use the following command.

```
nvm install node
```

### Running the app locally with DEBUG enabled

```
DEBUG=moj-express-skeleton:* npm start
```
This enables DEBUG, and you can type http://localhost:3000/ into your browser to access the app.

## Routing
TODO

https://expressjs.com/en/guide/routing.html

## Testing
TODO

### Unit testing
TODO

### e2e testing
TODO


## Features
- [Asset management](#asset-management)
- [Cache busting](#cache-busting)
- [Form validation](#form-validation)
- [CSRF protection](#csrf-protection)
- [Content Security Policy (CSP)](#content-security-policy-csp)
- [Response compression](#response-compression)
- [Rate limiting](#rate-limiting)
- [Nunjucks support](#nunjucks-support)
- [ES6 JSDocs](#es6-jsdocs)
- [Linter](#linter)
- [Security](#security)
- [Axios](#axios)
- [SQLite database](#sqlite-database)

## Examples of features 
Please refer to the specific packages documentation for more details.

### Cache busting
TODO

- broswer caching stylings, so not need to refresh browser
- hashes into the names of JS & CSS so we cna check the difference 
- package mangagement tool that Imitaz will be implenting

### Form validation
TODO

- copy of stuff in Patrick PR
- express has it's own documentation

### CSRF protection
TODO

- look in repo
- has it's own documentatiom

### Content Security Policy (CSP)
TODO

- look at PAtrick PR
- [helmet.js](https://helmetjs.github.io/)


### Response compression
TODO

- `import compression from 'compression';`


### Rate limiting
TODO

- check repo

### Nunjucks support
TODO

- link to nunjucks

### ES6 JSDocs
TODO

- link to docs

### Linter
TODO

- es lint
- link to documentation 

### Security
TODO
- [express-session](https://www.npmjs.com/package/express-session) (cookie handling for browser session)

### Axios
TODO

### SQLite database

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

## Contributers
- [Patrick Sweeting](https://github.com/psweeting1) (Primary maintainer)
- [Imtiaz Ahmed](https://github.com/imtiazAhmd) (Primary maintainer)
- [Masum Khan](https://github.com/MazOneTwoOne) (Maintainer)
- [Stephanie de Jong](https://github.com/skdejong) (Maintainer)

## Support
This software is provided *"as-is"* without warranty. Support is provided on a *"best endeavours"* basis by the maintainers and open source community.

If you are a civil servant you can sign up to the [UK Government Digital Slack](https://ukgovernmentdigital.slack.com/signup) workspace to contact the maintainers listed [above](#contributers) and the community of people using this project in the [#govuk-design-system](https://ukgovernmentdigital.slack.com/archives/C6DMEH5R6) channel.


## Crediting
TODO

give us credit
