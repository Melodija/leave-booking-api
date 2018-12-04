const express = require('express');
const Product = require('../models/productModel');
const productRouter = express.Router();

productRouter.route('/')
  .get((req,res) => {
    Product.find({}, (err, products) => {
      res.json(products)
    })
  })

  .post((req,res) => {
    let product = new Product(req.body);
    product.save()
    res.status(201).send(product)
    })


  productRouter.route('/:productId')
    .get((req, res) => {
      Product.findById(req.params.productId, (err, product) => {
        res.json(product)
      })
    })

module.exports = productRouter;
