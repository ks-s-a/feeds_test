'use strict'

const multiparty = require('connect-multiparty')
const cors = require('cors')
const express = require('express')

const app = express()

app.use( multiparty() )
app.use( cors() )

module.exports = app

require('./routes')
