var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('contact_us', { title: 'Contact Us' });

});

module.exports = router;
