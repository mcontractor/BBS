var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });

});

router.post('/submit', function(req,res,next){
	// MongoClient.connect('mongodb://127.0.0.1:27017/BBS'

 	var url = 'mongodb://127.0.0.1:27017/BBS';
	MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
	    };
		var users = db.collection("users");

		var user1 = {
			email : req.body.emailid,
			password : req.body.password,
			name : req.body.mem_name,
			dob : {d:req.body.dd, m:req.body.mm, y:req.body.yyyy},
			gender : req.body.gender,
			number : req.body.contactnum
		};

		users.insert([user1]);
		db.close();
	});
	res.redirect('/security_code');
});

module.exports = router;
