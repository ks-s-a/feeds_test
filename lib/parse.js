'use strict'

const csvParse = require('csv-parse')

/**
 * Parse CSV
 *
 * @param      {Object}   options
 * @param      {string}   data
 * @return     {Promise}
 */
function parse(options, data) {
  return new Promise((resolve, reject) => {
    csvParse(data, {
      delimiter: options.delimiter,
      relax: true,
      skip_lines_with_empty_values: true,
      skip_empty_lines: true,
    }, (err, out) => {
      if (err)
        return reject(err)

      if (typeof options.idFieldIndex !== 'undefined' &&
        typeof options.priceFieldIndex !== 'undefined')
        out = _fieldsPick(out, options.idFieldIndex, options.priceFieldIndex)

      if (typeof options.fromLine !== 'undefined')
        out = out.slice(options.fromLine)

      return resolve(out)
    })
  })  
}

/**
 * Pick productId and price fields from row
 *
 * @param      {array}   data             array of rows
 * @param      {number}  idFieldIndex     The identifier field index
 * @param      {number}  priceFieldIndex  The price field index
 * @return     {array}
 */
function _fieldsPick(data, idFieldIndex, priceFieldIndex) {
  return data.map(row => ({
    product_id: row[idFieldIndex],
    price: row[priceFieldIndex],
  }))
}

module.exports = parse
