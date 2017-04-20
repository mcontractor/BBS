var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('community', { title: 'Community' });

});

module.exports = router;