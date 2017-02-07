'use strict'

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const feedSchema = mongoose.Schema({
  url: String,
  name: String,
  products: [
    {
      product_id: String,
      price: String,
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = feedSchema
