const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/forms', (req, res, next) => {
  res.render('demos/forms');
});

router.get('/forms/bank-details', (req, res, next) => {
  res.render('demos/bank_details');
});

module.exports = router;
