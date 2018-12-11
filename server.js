const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const productRouter = require('./routes/productRouter');

const app = express();
const port = process.env.PORT || 8080;
const db = mongoose.connect(process.env.DB_CONNECTION);

mongoose.set('debug', true);
app.use(cors())
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.redirect('/product'));
app.use('/product', productRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
