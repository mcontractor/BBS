var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var val = req.query.a;
	if (val == undefined)
		val = '';
  res.render('index', { title: 'Express', message:val});
});

module.exports = router;
