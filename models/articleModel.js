const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleModel = new Schema({
  dateAdded: { type: Date, default: Date.now },
  name: String,
  category: String,
  images: [ String ],
  text: String
});

module.exports = mongoose.model('Article', articleModel);
