var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var json_ads=[];


	var sess = require('./login.js').sess;
    if(sess.email){
	 	var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://127.0.0.1:27017/BBS';

		MongoClient.connect(url, function(err, db) {
			if (err) {
	        	console.log('Unable to connect to the Server:', err);
	      	} else {
	        console.log('Connected to Server');
		    };

		    if (req.query.a != undefined) {
		    	var val = req.query.a;
		    	var cursor = db.collection('requests').find({'category':val});		   
			    cursor.each(function(err, doc) {
			    	if(doc != null){
			    		json_ads.push(doc);	
			    	}
			    	else {
			    		res.render('borrowscreen2', { title: 'borrowscreen2', name122:sess.name, array:json_ads});
			    	}
			    });
		    }
		    else if (req.query.b != undefined) {
		    	var val = req.query.b;
		    	var cursor = db.collection('requests').find();		   
			    cursor.each(function(err, doc) {
			    	if(doc != null){
			    		var string = (doc.name).toLowerCase();
					    var substring = val;
						if (string.indexOf(substring) !== -1){
							json_ads.push(doc);
						} 	
			    	}
			    	else {
			    		res.render('borrowscreen2', { title: 'borrowscreen2', name122:sess.name, array:json_ads});
			    	}
			    });
		    }
		    else if (req.query.c != undefined){
		    	var val = (req.query.c).split('~');
		    	var value1 = val[0];
		    	var value2 = val[1];
		    	var cursor = db.collection('requests').find({'category':value1});		   
			    cursor.each(function(err, doc) {
			    	if(doc != null){
			    		var string = (doc.name).toLowerCase();
					    var substring = value2;
						if (string.indexOf(substring) !== -1){
							json_ads.push(doc);
						} 	
			    	}
			    	else {
			    		res.render('borrowscreen2', { title: 'borrowscreen2', name122:sess.name, array:json_ads});
			    	}
			    });
		    }

		}); 
	
	}
});


module.exports = router;