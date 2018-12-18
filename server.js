require('dotenv').config();
const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      uuid = require ('uuid/v4'),
      cors = require('cors'),
      session = require('express-session'),
      FileStore = require('session-file-store')(session),
      passport = require('passport');

const productRouter = require('./routes/productRouter'),
      authRouter = require('./routes/authRouter');

const app = express(),
      port = process.env.PORT || 8080,
      db = mongoose.connect(process.env.DB_CONNECTION);

mongoose.set('debug', true);
app.use(cors())
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  next();
})

app.use(session({
  genid: (req) => {
    return uuid()
  },
  store: new FileStore(),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.redirect('/product'));
app.use('/product', productRouter);
app.use(authRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
