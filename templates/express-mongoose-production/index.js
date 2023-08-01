require('dotenv').config()
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const Logger = require('./src/utils/logger.utils')
const morgan = require('morgan')
const limitRequests = require('./src/utils/limitRequests.utils')
const multerUpload = require('./src/middlewares/multer.middleware')
const {
  connectDevelopment,
  connectProduction
} = require('./src/config/mongoose.config')

// parse request body
app.use(express.json())

// parse url encoded data request body
app.use(express.urlencoded({ extended: true }))

// Enable CORS
app.use(cors())

// parse cookie
app.use(cookieParser())

// Set security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
)

// sanitize
app.use(xss())
app.use(mongoSanitize())

// Connect to MongoDB
// if (process.env.NODE_ENV === 'production') {
//   connectProduction().catch((err) => {
//     Logger.error(err.message)
//   })
// } else {
//   connectDevelopment().catch((err) => {
//     Logger.error(err.message)
//   })
// }

// Init multer
app.use(multerUpload.single('image'))

// Log HTTP requests in console
app.use(morgan('dev'))
// Log HTTP requests in file
app.use(
  morgan('dev', {
    stream: fs.createWriteStream(
      path.join(__dirname, '/logs/requests/access.log'),
      { flags: 'a' }
    )
  })
)

// Limit requests with out a store
app.use(limitRequests.limitWithExpress)
// Limit requests with a store
app.use(limitRequests.limitWithRedis)

// Use Routes
app.use('/api', require('./src/api'))

// Start server and handle error
const port = process.env.PORT || 3000
app.listen(port, () => {
  Logger.info(`Listening on port ${port}...`)
})

app.on('uncaughtException', (err) => {
  Logger.error(err)
  process.exit(1)
})

module.exports = app
