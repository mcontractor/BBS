var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var name12;
	var json_ads=[];
	var val = req.query[1]
	if (val == undefined)
		val = 0;
	var i = val*5;

    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;

  var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

		MongoClient.connect(url, function(err, db) {
			if (err) {
	        	console.log('Unable to connect to the Server:', err);
	      	} else {
	        console.log('Connected to Server');
		    };

		    var cursor = db.collection('ads').find();		   
		    cursor.each(function(err, doc) {
		    	if(doc != null){
		    		json_ads.push(doc);
		   			
		    	}
		    	else {
		    		console.log(json_ads.length)
		    		res.render('buyscreen', { title: 'buyscreen', name122:name12, array_1: json_ads[1+i],array_2:json_ads[2+i],array_3:json_ads[3+i],array_4:json_ads[4+i],array_5:json_ads[0+i] });
		    	}
		    });
		}); 
		

});

router.post('/submit',function(req,res,next){
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	if (req.query.search) {
		MongoClient.connect(url, function(err, db) {
			if (err) {
	        	console.log('Unable to connect to the Server:', err);
	      	} else {
	        console.log('Connected to Server');
		    };

		    var category = req.body.category;

		    var cursor = db.collection('ads').find({'category':category});
		   
		    cursor.each(function(err, doc) {
		    	if(doc != null){
		    		console.log('result found');
		   			
		    	}
		    	else {
		    		console.log('result not found');
		    	}
		    });
		}); 
	}
	// When the user enters nothing and category is All
	else if (req.query.search == null && req.body.category == 'All') {
		res.render('/buyscreen');	
	}	

});

module.exports = router;

