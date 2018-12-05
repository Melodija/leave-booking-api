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


  productRouter.use('/:productId', (req, res, next) => {
    Product.findById(req.params.productId, (err, product) => {
      if (err)
        res.status(404).send(err)
      else {
        req.product = product;
        next()
      }
    })
  })

  productRouter.route('/:productId')
    .get((req, res) => {
        res.json(req.product)
    })

    .patch((req,res) => {
        // Do not change the ID of the product - remove it from the request
        if(req.body._id){
          delete req.body._id;
        }

        for( let x in req.body ){
            req.product[x] = req.body[x];
        }
        req.product.save();
        res.json(req.product);
    })

    .delete((req, res) => {
      req.product.remove(err => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(204).send('Product removed.')
        }
      })
    })

module.exports = productRouter;
