const rateLimit = require('express-rate-limit')
const client = require('redis').createClient()
const limiter = require('express-limiter')

const limitWithExpress = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
})

const limitWithRedis = (app) => {
  return limiter(app, client, {
    path: '/api',
    method: 'all',
    lookup: ['connection.remoteAddress'],
    // 150 requests per hour
    total: 150,
    expire: 1000 * 60 * 60
  })
}

module.exports = {
  limitWithExpress,
  limitWithRedis
}
