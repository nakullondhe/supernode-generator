const router = require('express').Router()

router.get('/test', (req, res) => {
  res.send('Hello World!')
})

// sample route
router.use('/v1', require('./v1'))

module.exports = router
