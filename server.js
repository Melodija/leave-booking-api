const express = require('express');
const mongoose = require('mongoose');

const itemRouter = require('./Routes/itemRouter');

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds123844.mlab.com:23844/jedi-cycle');

mongoose.set('debug', true);

app.get('/', (req, res) => res.send('hello world'));
app.use('/item', itemRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
