const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  images: [ String ],
  quantityInStock: Number,
  dateAdded: { type: Date, default: Date.now },
  shipping: {
    uk: Number,
    europe: Number,
    world: Number
  },
  sizing: [ String ],
  properties: {
    colourBrakes: [ String ],
    hubType: [ String ],
    stemSize: [ String ],
    frameSize: [ String ]
  }
});

module.exports = mongoose.model('Product', productModel);
