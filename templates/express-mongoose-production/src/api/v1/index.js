const router = require('express').Router()

router.get('/test', (req, res) => {
  res.send('You have hit api v1')
})

module.exports = router
