const express = require('express');
const xss = require('xss');
const ProductsService = require('./products-service');

const productsRouter = express.Router();

const serializeProducts = product => ({
  product_id: product.product_id,
  product_name: xss(product.product_name),
  price: xss(product.price),
  image: xss(product.image),
  category: xss(product.category),
  available_quantity: xss(product.available_quantity),
  description: xss(product.description),
  measurements: xss(product.measurements),
  how_made: xss(product.how_made),
  care_instructions: xss(product.care_instructions),
})

productsRouter
  .route('/')

  .get((req, res, next) => {
    ProductsService.getAllProducts(
      req.app.get('db'),
    )
      .then(products => {
        res.json(products.map(serializeProducts))
      })
      .catch(next)
  })

  productsRouter
  .route('/:product_id')

  .all((req, res, next) => {
    ProductsService.getById(
      req.app.get('db'),
      req.params.product_id
    )
      .then(product => {
        if (!product) {
          return res.status(404).json({
            error: { message: 'Product Not Found' }
          })
        }
        res.product = product
        next()
      })
      .catch()
  })  

  .get((req, res) => {
    res.json(serializeProducts(res.product))
  })

module.exports = productsRouter;