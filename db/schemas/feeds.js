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

feedSchema.statics.getShop = function(name) {
  return this.findOne({ name }, { products: 1 }).exec()
}

feedSchema.statics.getAllShops = function() {
  return this.find({ name: { $ne: null } }, { 'name': 1 }).exec()
}

feedSchema.statics.getShopProductPrice = function(name, productId) {
  return this.getShop(name).then(shop => {
    if (!shop || !shop.products || !Array.isArray(shop.products))
      return null

    const product = shop.products.find(p => p.product_id === productId)
    return product && product.price
  })
}

feedSchema.statics.saveFeed = function(data) {
  return this.create(data)
}

module.exports = feedSchema
