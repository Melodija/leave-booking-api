const express = require('express');
const Item = require('../models/itemModel');
const itemRouter = express.Router();


Item.create({item: "test", qty: 3}, function(err, doc) {
    // At this point the jobs collection is created.
});

itemRouter.route('/')
  .get((req,res) => {
    Item.find({}, (err, items) => {
      res.json(items)
    })
  })

  itemRouter.route('/:itemId')
    .get((req, res) => {
      Item.findById(req.params.itemId, (err, item) => {
        res.json(item)
      })
    })

module.exports = itemRouter;
