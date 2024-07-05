const db = require('../utils/sqliteSetup');


const setupDB = (app) => {
    const dbRequest = (req, res, next) => {
        req.db = db;
        next();
    };

    app.use(dbRequest)
}

module.exports = setupDB;