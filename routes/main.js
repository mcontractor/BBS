var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log(req.query.name);
  res.render('main', { title: 'Main' });

});

module.exports = router;