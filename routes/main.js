var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var sess = require('./login').sess;
	if(sess.email){
		res.render('main', { title: 'Main' });
	}

});

module.exports = router;