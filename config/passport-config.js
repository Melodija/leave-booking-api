const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require('../models/userModel');
const bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user, {message: 'logged in'});
      }
      return done(null, false, { message: 'Incorrect password.' });
    });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
