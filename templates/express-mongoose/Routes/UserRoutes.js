const router = require('express').Router();

router.get('/user', (req, res) => {
  res.send('Hello World! From UserRoutes');
});

module.exports = router;