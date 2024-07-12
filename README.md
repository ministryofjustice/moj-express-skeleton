# MOJ Express Skeleton
![govuk-frontend 5.4.0](https://img.shields.io/badge/govuk--frontend%20version-5.4.0-005EA5?logo=gov.uk&style=flat)

**MOJ Express.js Skeleton is a community tool using the GOV.UK Design System. The Design System team is not responsible for it and cannot support you with using it. Contact the maintainers directly if you need help or you want to request a feature.**

This is a template app using the GOV.UK Frontend and GOV.UK Design System which is designed to get a new project started quicker.

The app is provided intentionally bare, with just the essential parts that all services need, such as error pages, accessibility statement, cookie banner, cookie page and privacy notice. It uses a number of other packages to provide the [features](#features) described below with sensible and best-practice defaults. Please read the next steps section for guidance on how to start building out your app on top of this template.

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

### Running the app locally with DEBUG enabled

```
DEBUG=moj-express-skeleton:* npm start
```
TODO: Then, load http://localhost:3000/ in your browser to access the app.


## Features
- [Asset management](#asset-management)
- Cache busting
- Form validation
- CSRF protection
- Content Security Policy (CSP)
- Response compression
- Rate limiting
- Nunjucks support
- ES6 JSDocs
- Linter
- Security
  - [helmet.js](https://helmetjs.github.io/)
  - [express-session](https://www.npmjs.com/package/express-session)



## Examples of features 
TODO
### Asset management

sfhasjklfhkasdjfhaskjfhsjkdfh


- db/sql
- axios
- forms



## Contributers
TODO
- add github of us

## Support
TODO (add links and content check)
This software is provided "as-is" without warranty. Support is provided on a "best endeavours" basis by the maintainers and open source community.

If you are a civil servant you can sign up to the UK Government Digital Slack workspace to contact the maintainers listed above and the community of people using this project in the #govuk-design-system channel.

Otherwise, please see the contribution guidelines for how to raise a bug report or feature request.

