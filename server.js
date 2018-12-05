const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const productRouter = require('./routes/productRouter');

const app = express();
const port = process.env.PORT || 80;
const db = mongoose.connect(process.env.DB_CONNECTION);

mongoose.set('debug', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.redirect('/product'));
app.use('/product', productRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
