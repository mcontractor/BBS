var express = require('express')
var router = express.Router();
var rimraf = require('rimraf');

router.get('/', function(req, res, next) {
	var sess = require('./login.js').sess;
    if(sess.email){
    	if (req.query.a != undefined) {
			var val = (req.query.a).split('~');
			var value1 = val[0];
			var value2 = val[1];
			var value3 = val[2];
			var path = 'public/ads/'+value1+'/'+value3;

			rimraf(path, function () { 
				var MongoClient = require('mongodb').MongoClient;
				var url = 'mongodb://127.0.0.1:27017/BBS';

				MongoClient.connect(url, function(err, db) {
					if (err) {
					console.log('Unable to connect to the Server:', err);
					} else {
					console.log('Connected to Server');
					};

					db.collection('ads').remove({'email':value1,'title':value2,'name':value3});      
					res.redirect('/profile'); 
				});
		    });
		}
	  	else if(req.query.b != undefined) {
	  		var val = (req.query.b).split('~');
			var value1 = val[0];
			var value2 = val[1];
			var value3 = val[2];
			var path = 'public/requests/'+value1+'/'+value3;

			rimraf(path, function () { 
				var MongoClient = require('mongodb').MongoClient;
				var url = 'mongodb://127.0.0.1:27017/BBS';

				MongoClient.connect(url, function(err, db) {
					if (err) {
					console.log('Unable to connect to the Server:', err);
					} else {
					console.log('Connected to Server');
					};

					db.collection('requests').remove({'email':value1,'title':value2,'name':value3});      
					res.redirect('/profile'); 
				});
		  	});
		}
	}
});

module.exports = router;
