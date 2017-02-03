'use strict'

const app = require('./api/app')

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server was launched on ${PORT} port.`)
})
