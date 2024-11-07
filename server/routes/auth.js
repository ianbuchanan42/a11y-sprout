const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start GitHub OAuth login
// router.get(
//   '/github/callback',
//   passport.authenticate('github', {
//     failureRedirect: '/', // Redirect to home or login page on failure
//   }),
//   (req, res) => {
//     // Successful authentication
//     return res.json({ success: true, message: 'Authentication successful' });
//   }
// );

// router.get(
//   '/github',
//   passport.authenticate('github', { scope: ['user:email'] })
// );

// GitHub OAuth callback
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
  }),
  (req, res, next) => {
    // Successful authentication, redirect to client page or dashboard.
    //res.json({ success: true, message: 'Authentication successful' });
    //return res.redirect(path.join(__dirname, '../public', 'index.html'));
    return res.redirect('http://localhost:8080/');
  }
);

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error clearing session' });
      }

      res.clearCookie('connect.sid');

      return res.json({ authenticated: false, user: {} });
    });
  });
});

// Check if user is authenticated

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', req.user);

    return res.json({ authenticated: true, user: req.user });
  } else {
    return res.json({ authenticated: false });
  }
});

module.exports = router;

// // Example usage in routes
// router.get('/protected-route', ensureAuthenticated, (req, res) => {
//   res.json({ message: 'This is a protected route' });
// });
