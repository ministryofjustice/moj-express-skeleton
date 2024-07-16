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

### Form validation
TODO

### CSRF protection
TODO

### Content Security Policy (CSP)
TODO

### Response compression
TODO

### Rate limiting
TODO

### Nunjucks support
TODO

### ES6 JSDocs
TODO

### Linter
TODO

### Security
TODO

- [helmet.js](https://helmetjs.github.io/)
- [express-session](https://www.npmjs.com/package/express-session)

### Axios
TODO

### SQLite database
TODO


## Contributers
- [Patrick Sweeting](https://github.com/psweeting1) (Primary maintatiner)
- [Imtiaz Ahmed](https://github.com/imtiazAhmd) (Primary maintatiner)
- [Masum Khan](https://github.com/MazOneTwoOne) (Maintatiner)
- [Stephanie de Jong](https://github.com/skdejong) (Maintatiner)

## Support
This software is provided *"as-is"* without warranty. Support is provided on a *"best endeavours"* basis by the maintainers and open source community.

If you are a civil servant you can sign up to the [UK Government Digital Slack](https://ukgovernmentdigital.slack.com/signup) workspace to contact the maintainers listed [above](#contributers) and the community of people using this project in the [#govuk-design-system](https://ukgovernmentdigital.slack.com/archives/C6DMEH5R6) channel.
