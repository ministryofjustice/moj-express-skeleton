import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main/index', {csrfToken: req.csrfToken(), errors: {}, data: {} });
});

// This is a basic example of express validation and should not be viewed as a development standard.
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

export default router;
