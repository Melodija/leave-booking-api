require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const uuid = require ('uuid/v4')
const cors = require('cors')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport');
const corsConfig = require('./config/cors-options')

const productRouter = require('./routes/productRouter'),
      authRouter = require('./routes/authRouter'),
      galleryRouter = require('./routes/galleryRouter');

const app = express(),
      port = process.env.PORT || 8080,
      db = mongoose.connect(process.env.DB_CONNECTION);


app.use(cors(corsConfig))
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  genid: req => {
    return uuid()
  },
  store: new FileStore(),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

require('./config/passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.redirect('/product'));
app.use('/product', productRouter);
app.use('/gallery', galleryRouter);
app.use(authRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
