var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('single_ad', { title: 'Ad' });

});

module.exports = router;
