const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

/* GET home page. */
router.get('/', csrfProtection, (req, res, next) => {
  res.render('main/index', {csrfToken: req.csrfToken(), errors: {}, data: {} });
});

router.post('/', csrfProtection, [
  check('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  check('name').notEmpty().withMessage('Name is required').trim().escape(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('main/index', {
      csrfToken: req.csrfToken(),
      errors: errors.mapped(),
      data: req.body
    });
  }
  res.send('Form submitted successfully');
});

module.exports = router;
