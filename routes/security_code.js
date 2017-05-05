var express = require('express')
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
router.get('/', function(req, res, next) {
  res.render('security_code', { title: 'Security Check' });

});

router.post('/submit',function(req,res,next){
	// MongoClient.connect('mongodb://127.0.0.1:27017/BBS')
	var email = require('./signup.js').email;	
	var verf = require('./signup.js').verf;
	var MongoClient = require('mongodb').MongoClient;
	var check = 0;

	if(req.body.verfcode == verf){
		res.redirect('/main')
	}
	else{
		res.redirect('/security_code')
	}
});

module.exports = router;
