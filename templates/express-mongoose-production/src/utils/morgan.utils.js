const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, '/logs/requests/access.log'), { flags: 'a' })
})
