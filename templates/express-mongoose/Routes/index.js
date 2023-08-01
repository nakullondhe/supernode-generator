const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('Hello World!');
})

//sample route
router.use('/auth', require('./UserRoutes'));

module.exports = router;
