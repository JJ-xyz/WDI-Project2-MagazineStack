//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var passport = require('passport');

//*-----------------------------------------------------*
//* Reusable functions                                  *
//*-----------------------------------------------------*
var authorization = function(req, res, next) {
  if (!req.user || req.user._id != req.params.Userid) {
    res.json({status: 401, message: 'unauthorized'})
  } else {
    next()
  }
};

//*-----------------------------------------------------*
//* Routes                                              *
//*-----------------------------------------------------*
// ========== Root NO access: /sec =====================
router.get('/', function(req, res) {
  res.json({status: 403, message: 'Forbiden for you'})
});

// ========== Root create userId: /sec/signup =========
router.post('/signup', function(req, res) {
  UserModel.register(new UserModel(
    { username : req.body.username,
      favoriteBook: req.body.favoriteBook,
      favoriteColor: req.body.favoriteColor }),
    req.body.password, function(err, user) {
      if (err) {
        return res.json({ user : user });
      } else {
        console.log("[ XYZ ] new user sign-up", req.body.username);
      }
    res.redirect('/home');
  });
});

// ========== Root login w/userId: /sec/signup ========
router.post('/login', passport.authenticate('local'),
  function(req, res) {
    req.session.save(function (err) {
      if (err) {
        return next(err);
      };
         console.log("[ XYZ ] new user sign-in", req.body.username);
         res.redirect('/home');
  });
});

// ========== Root logoff /sec/logout ========
router.delete('/logout', function(req, res) {
  req.logout();
  res.redirect('/home');
  console.log("[ XYZ ] current user Sign-off");
});

module.exports = router;
