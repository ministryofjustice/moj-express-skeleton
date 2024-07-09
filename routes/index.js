const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const csurf = require('csurf');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main/index', {csrfToken: req.csrfToken(), errors: {}, data: {} });
});

// This is a basic example of express validation.
router.post('/', [
  check('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  check('fullName').notEmpty().withMessage('Name is required').trim().escape(),
  check('subscribe', 'Please select an option').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('main/index', {
      csrfToken: req.csrfToken(),
      errors: errors.mapped(),
      data: req.body
    });
  }
  // on success
  res.render('main/index', {
    data: {success: true}
  });
});

module.exports = router;
