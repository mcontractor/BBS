var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('security_code', { title: 'Security Check' });

});

module.exports = router;
