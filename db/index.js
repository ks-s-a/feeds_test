'use strict'

const mongoose = require('mongoose')

const feedSchema = require('./schemas/feeds')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost', (err) => {
  if (err)
    throw err
})

module.exports = mongoose.model('Feeds', feedSchema)
