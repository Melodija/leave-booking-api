const passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      mongoose = require("mongoose"),
      User = require('./models/userModel'),
      bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
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
