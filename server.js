const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRouter = require('./routes/productRouter');

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds123844.mlab.com:23844/jedi-cycle');

mongoose.set('debug', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('hello world'));
app.use('/product', productRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
