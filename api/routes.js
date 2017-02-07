'use strict'

const request = require('request-promise-native')

const feeds = require('../db')
const app = require('./app')
const parse = require('./../lib/parse')

app.get('/', (req, res) => {
  const shop = req.query.shop
  const productId = req.query.product_id

  if (shop && productId)
    return feeds.getShopProductPrice(shop, productId)
      .then(ans => res.send(JSON.stringify(ans)))
      .catch(e => {
        console.error('Error happend: ', e)
        res.status(404).send('No such shop')
      })

  if (shop)
    return feeds.getShop(shop)
      .then(ans => res.send(JSON.stringify(ans)))
      .catch(e => {
        console.error('Error happend: ', e)
        res.status(404).send('No such shop or product_id')
      })

  return feeds.getAllShops()
    .then(ans => res.send(JSON.stringify(ans)))
    .catch(e => {
      console.error('Error happend: ', e)
      res.status(404).send('We don\'t have any shop')
    })
})

app.post('/', (req, res) => {
  const url = req.body.url
  const name = req.body.name
  const delimiter = req.body.delimiter && req.body.delimiter.replace('\\t', '\t') || '\t'
  const idFieldIndex = req.body.idFieldIndex || 0
  const priceFieldIndex = req.body.priceFieldIndex || 3
  const fromLine = req.body.fromLine || 1

  if (!req.body.url || !req.body.name)
    return res.status(403).send('Incorrect input variables')

  const parseOptions = {
    delimiter,
    idFieldIndex,
    fromLine,
    priceFieldIndex,
  }

  request(url)
    .then(csv => parse(parseOptions, csv))
    .then(parsedData => {
      const dbRow = {
        url,
        name,
        products: parsedData,
      }

      return feeds.saveFeed(dbRow)
        .then(_ => parsedData) // we want to sand raw data to clinet,
                               // not a db instance
    })
    .then(parsedData => res.send(JSON.stringify(parsedData)))
    .catch(e => {
      console.error('Error happend: ', e)
      res.status(400).send('Cann\'t get resource data')
    })
  
})
