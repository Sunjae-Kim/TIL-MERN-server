const passport = require('passport');
const router = require('express').Router();

// just toss
router.get(
  "/",
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// req + code => google => Real user data get!
router.get(
  '/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;