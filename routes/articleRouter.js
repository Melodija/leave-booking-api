const express = require('express'),
      session = require('express-session'),
      uuid = require ('uuid/v4');

const articleRouter = express.Router(),
      Article = require('../models/articleModel');

// articleRouter.use('/', (req, res, next) => {
//   if(req.isAuthenticated()) {
//     next()
//   } else {
//     res.status(401).send('Not authenticated')
//   }
// })

articleRouter.route('/')
  .get((req,res) => {
    console.log('UUID: ' +req.sessionID)
        Article.find({}, (err, articles) => {
          res.json(articles)
        })
  })

  .post((req,res) => {
    let article = new Article(req.body);
    article.save()
    res.status(201).send(article)
  })

articleRouter.route('/category/:category')
  .get((req, res) => {
    console.log(req)
    Article.find({ category: req.params.category }, (err, articles) => {
      res.json(articles)
    })
})


  articleRouter.use('/:articleId', (req, res, next) => {
    Article.findById(req.params.articleId, (err, article) => {
      if (err)
        res.status(404).send(err)
      else {
        req.article = article;
        next()
      }
    })
  })

  articleRouter.route('/:articleId')
    .get((req, res) => {
        res.json(req.article)
    })

    .patch((req,res) => {
        // Do not change the ID of the article - remove it from the request
        if(req.body._id){
          delete req.body._id;
        }

        for( let x in req.body ){
            req.article[x] = req.body[x];
        }
        req.article.save();
        res.json(req.article);
    })

    .delete((req, res) => {
      req.article.remove(err => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(204).send('Article removed.')
        }
      })
    })

module.exports = articleRouter;
