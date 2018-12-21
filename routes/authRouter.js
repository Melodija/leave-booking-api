const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      bcrypt = require('bcrypt-nodejs');

const authRouter = express.Router();
      User = require('../models/userModel');
      salt = bcrypt.genSaltSync(10);

authRouter.route('/login')
  .get((req, res) => {
    res.send(`login`, {user: req.user})
  })

  .post(passport.authenticate('local'), (req, res, next) => {
    res.redirect('/product');
  })

authRouter.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/login');
  })

authRouter.post('/register', function(req, res) {
  let hashedPassword = bcrypt.hashSync(req.body.password, salt);

  User.create({ username : req.body.username, password : hashedPassword },
  function (err, user) {
    if (err) return res.status(500).send('There was a problem registering the user.')
    res.status(200).send({ auth: true, user: user });
  });
});

module.exports = authRouter;
