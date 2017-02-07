'use strict'

const mongoose = require('mongoose')

const feedSchema = require('./schemas/feeds')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost', (err) => {
  if (err)
    throw err
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
  return this.update({ name: data.name }, data, { upsert: true })
}

module.exports = mongoose.model('Feeds', feedSchema)
