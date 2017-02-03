'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use( bodyParser.urlencoded({ extended: true }) )

module.exports = app

require('./routes')
